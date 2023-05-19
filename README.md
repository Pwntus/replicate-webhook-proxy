# Replicate Webhook Proxy

## Installation

```sh
npm install replicate-webhook-proxy
```

## Usage

```js
// Import module
const rwp = require("replicate-webhook-proxy");

// Define a key / password
const key = "foo";

// Create a websocket client
const client = rwp(key);

// Setup event listeners
client.on("open", () => console.log("onopen"));
client.on("close", () => console.log("onclose"));
client.on("message", (event) => console.log("onmessage", event.data));
client.on("error", (event) => console.log("onerror", event.message));
```

The `message` event returns an event with a `data` property of the following structure:

```js
{
  query: {
    key: "my_key"
    // Other query string parameters in the webhook URL
  },
  body: {
    // Replicate prediction data
  }
}
```

## Why?

To receive HTTP webhook requests you need a publicly accessible endpoint on the internet. This is easy if you have a web server already exposed to the internet, but not if you're using a local computer. You can use tools such as [ngrok](https://ngrok.com/) but they require a separately running process that opens a proxy tunnel to your computer.

This NPM package let's you connect to a websocket enpoint and receive webhook event, right in your broweser or Node.js code!

## How?

TBD
