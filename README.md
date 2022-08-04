# tmpx 📨
A stupidly simple to use temporary mail host with an easy to use JSON/WS API _Yes, there are hundreds of these. It's just fun to learn new things_

## Core features 📃
- A simple web UI where you can generate a temp mail.
- An easy to use Websocket/HTTP API so you can integrate it into your own stuff.

## Website and email 🕸️
The website will be hosted on `https://tmpx.email` and the domain that's for receiving mail will be `@tmpx.sa.com`.

## Technologies 🤖
It'll be straight forward:
- Express for an API you can interact with.
- Socket.io for the Websockets so the front-end doesn't have to refresh.
- An IMAP server, this stores all the mail. Why use a DB when we can just use IMAP for now.
- imap-simple to interact with the IMAP server.

## Roadmap 🛣️
- [ ] Setup a backend that can stream imap to the right places
- [x] An endpoint that will fetch recent mail from the IMAP server
- [ ] A CRON that will clear the main inbox after a certain amount of time
- [ ] Download to PDF
- [ ] Forward mail to your own places, like a proxy
- [ ] Connect your own domain, you'll probably have to set something up that it arrives at our inbox.
- [ ] Storing everything to a faster database than IMAP as soon as the mail arrives & then remove it from the mailbox to leave no traces on the place it arrived at.
- [ ] Queuing queries so the IMAP server doesn't get flooded with useless queries.
- [ ] Ratelimitting based off the email address AND ip that the requests comes from.
- [ ] Automatically reconnect when the IMAP connection drops

## Backend routes
The base for the JSON-API is `https://json.tmpx.email`, it currently hosts the `@tmpx.sa.com` domain.
### `/mail/:emailAddress`
* Find all mails for a certain email emailAddress

### `/ping`
* Pong!
* Checks if the IMAP server is connected
## Partners 🤝
The IMAP server will be hosted by [LNGZL](https://lngzl.nl) which is my software development agency aka it's sponsored by myself 🎉

## License ⚖️
It's licenesed under the Apache-2.0 license, check `LICENSE.md` for _all_ information.
