import { Server } from "socket.io";
import { WsNamespace } from "./wsNamespace";

export class WebSocketServerWrapper {
    private readonly server: Server;
    private namespaces: WsNamespace[] = [];

    constructor(server: Server) {
        this.server = server;
    }

    initNamespaces() {
        this.namespaces.forEach((nsp) => {
            nsp.initNamespace();
        })
    }

    addNameSpace(name: string) {
        const newNsp = new WsNamespace(this.server, name);
        this.namespaces.push(newNsp);
    }
}