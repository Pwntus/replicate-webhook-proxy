declare module "replicate-webhook-proxy" {
  function rwp(key?: null): {
    events: {};
    socket: WebSocket | WebSocket;
    close: typeof close;
    on: (event: any, callback: any) => void;
    emit: (event: any, data: any) => void;
    interval: NodeJS.Timer;
  };
  export = rwp;
}
