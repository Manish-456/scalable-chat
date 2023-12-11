import { Server } from "socket.io";
import { Redis } from "ioredis";


const pub = new Redis(
    {
        host: 'redis-1bc7d74f-tamangmanish3456-43b4.a.aivencloud.com',
        port: 11202,
        username: 'default',
        password: 'AVNS_wXtrsxfnzMkAIN7lTJZ'
    }
);

const sub = new Redis(
    {
        host: 'redis-1bc7d74f-tamangmanish3456-43b4.a.aivencloud.com',
        port: 11202,
        username: 'default',
        password: 'AVNS_wXtrsxfnzMkAIN7lTJZ'
    }
);

class SocketService {
    private _io: Server

    constructor() {
        console.log(`Init Socket server`)
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*"
            }
        })
    }

    public initListener() {
        const io = this.io;

        console.log(`socket initialized...`)

        io.on("connect", async socket => {
            console.log(`New socket connected `, socket.id)

            socket.on("event:message", async ({ message }: { message: string }) => {
                console.log(`New Message received from the client`, message)
                await pub.publish('MESSAGES', JSON.stringify({ message }))
            })
        });

        sub.subscribe("MESSAGES");

        sub.on('message', (channel, message) => {
            if (channel === "MESSAGES") {
                io.emit('message', message);
            }
        })

    }

    get io() {
        return this._io;
    }
}

export default SocketService;