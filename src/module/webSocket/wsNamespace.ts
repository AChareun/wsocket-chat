import {Namespace, Server, Socket} from "socket.io";

export class WsNamespace {
    nsp: Namespace;

    constructor(server: Server, name: string) {
        this.nsp = server.of(name);
    }

    initNamespace() {
        this.onConnection();
    }

    private onConnection() {
        this.nsp.on('connection', (socket: Socket): void => {
            console.log('A user has connected');

            socket.on('chat message', (msg: string): void => {
                this.nsp.emit('chat message', msg);
            })

            socket.on('disconnect', (): void => {
                console.log('User disconnected');
            })
        })
    }
}
