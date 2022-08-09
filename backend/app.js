/**
 * Note! I usually first design the programm in a way that it would be able to
 * the basic functions.
 *
 * I'll then refactor the programm to make it more readable and usable.
 *
 * So if you look at this file and think "Why isn't something split up",
 * look above for the answer.
 */
require("dotenv").config();
const _ = require('lodash');
const cors = require('cors')
const express = require("express");

const app = express();
app.use(cors())
const isEmail = require("is-email");
const { convert } = require('html-to-text');
var h2p = require('html2plaintext')

const imaps = require("imap-simple");

let connection = null;

async function setup() {
  const config = {
    imap: {
      user: process.env.IMAP_USER,
      password: process.env.IMAP_PASSWORD,
      host: process.env.IMAP_HOST,
      port: 993,
      tls: true,
      authTimeout: 3000,
    },
  };
  connection = await imaps.connect(config);
  await connection.openBox("INBOX");
  console.log('connected')
}

setup();

setInterval(async () => {
  console.log('cleaning up')
  await connection.closeBox();
  await setup();
} , 60000);


// A ghetto function that strips the text from mail.
function stripText(text) {
  // For Gmail
  if(text.includes("<div dir=\"ltr\">") && text.includes("</div>")) {
    text = text.split("<div dir=\"ltr\">")[1].split("</div>")[0];
  }

  // For Hotmail
  if(text.includes("<1body") && text.includes("</body>")) {
    text = text.split("<body")[1].split("</body>")[0];
    text = "<body" + text + "</body>";
  }

  text = convert(text)
  text = h2p(text)

  return text;
}


app.get("/mail/:address", async (req, res) => {
  if (!connection) {
    return res.status(500).json({ msg: "mail server not running yet." });
  }

  const start = new Date();
  const address = req.params.address;

  if (!isEmail(address)) {
    return res.status(400).json({ msg: "invalid email address." });
  }

  if (address === process.env.IMAP_USER) {
    return res.status(400).json({ msg: "Couldn't fetch mails" });
  }

  var searchCriteria = [["HEADER", "envelope-to", address]];
  // TODO: Fetch subject, body and from
  var fetchOptions = { bodies: ["HEADER", "TEXT", ""], struct: false };
  const results = await connection.search(searchCriteria, fetchOptions);

  const mails = [];

  for (const mail of results) {
    var all = _.find(mail.parts, { "which": "TEXT" })
    var html = (Buffer.from(all.body, 'base64').toString('ascii'));
    mails.push({
      subject: mail.parts[0].body.subject[0],
      from: mail.parts[0].body.from[0],
      body: stripText(mail.parts[1].body),
      date: mail.parts[0].body.date[0],
      // raw: mail.parts
    });
  }

  mails.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const end = new Date();
  const time = end.getTime() - start.getTime();
  res.json({
    msg: "fetched all mails for given inbox",
    mails: mails,
    time: `${time}ms`,
    query: address,
  });
});

app.get("/", (req, res) => {
  res.json({
    msg: "listening to @tmpx.sa.com, just send mails to <whatever>@tmpx.sa.com and then use the /mail/<whatever>@tmpx.sa.com endpoint to get the mails.",
  });
});
app.all("/ping", (req, res) => {
  res.json({ msg: "pong", connected: !!connection });
});

app.listen(process.env.PORT ?? 80, () => {
  console.log(`📨 tmpx is live on port ${process.env.PORT ?? 80}`);
});
