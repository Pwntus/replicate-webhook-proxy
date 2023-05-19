const WS_ENDPOINT = "wss://hqbw9m86ua.execute-api.eu-west-1.amazonaws.com/prod";
const WS_TTL = 3600000 - 60000; // TTL 1h - margin

const ws =
  typeof window !== "undefined" && typeof WebSocket !== "undefined"
    ? WebSocket
    : require("ws");

const rwp = (key = null) => {
  if (!key) throw new Error(`Missing required parameter 'key'.`);

  const client = {
    events: {},
    socket: new ws(`${WS_ENDPOINT}/?key=${String(key)}`),
    close: function () {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
      clearInterval(this.interval);
    },
    on: function (event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    },
    emit: function (event, data) {
      const callbacks = this.events[event];
      if (callbacks) {
        if (event === "message") {
          try {
            data = {
              ...data,
              data: JSON.parse(data.data),
            };
          } catch (e) {
            console.log(e);
            /* NOP */
          }
        }
        callbacks.forEach((callback) => callback(data));
      }
    },
    interval: setInterval(function () {
      if (this.socket) {
        this.socket.close();
      }
      this.socket = new ws(`${WS_ENDPOINT}/?key=${String(key)}`);
    }, WS_TTL),
  };

  client.socket.onopen = (data) => client.emit("open", data);
  client.socket.onclose = (data) => client.emit("close", data);
  client.socket.onmessage = (data) => client.emit("message", data);
  client.socket.onerror = (data) => client.emit("error", data);

  return client;
};

module.exports = rwp;
