# tmpx 📨
A stupidly simple to use temporary mail host. _Yes, there are hundreds of these. It's just fun to learn new things_

## Core features
- A simple web UI where you can generate a temp mail.
- An easy to use Websocket/HTTP API so you can integrate it into your own stuff.

## Technologies
It'll be straight forward:
- Express for an API you can interact with.
- Socket.io for the Websockets so the front-end doesn't have to refresh.
- An IMAP server, this stores all the mail. Why use a DB when we can just use IMAP for now.
- imap-simple to interact with the IMAP server.

## Roadmap
- [ ] Setup a backend that can stream imap to the right places
- [ ] An endpoint that will fetch recent mail from the IMAP server
- [ ] A CRON that will clear the main inbox after a certain amount of time
- [ ] Download to PDF
- [ ] Forward mail to your own places, like a proxy
- [ ] Connect your own domain, you'll probably have to set something up that it arrives at our inbox.

## Partners
The IMAP server will be hosted by [LNGZL](https://lngzl.nl) which is my software development agency aka it's sponsored by myself 🎉

## License
It's licenesed under the Apache-2.0 license, check `LICENSE.md` for _all_ information.
