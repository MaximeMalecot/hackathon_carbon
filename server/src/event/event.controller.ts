import {
    Controller,
    Get,
    Req,
    Res,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { Public } from "src/auth/decorators/public.decator";
import { EventService } from "./event.service";

@ApiTags("events")
@Controller("events")
export class EventController {
    private users = []
    constructor(private readonly eventService: EventService) {}

    convertMessage = ({ type, ...data }) => {
        console.log(`event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`);
        return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
    };

    broadcastUnknown = (message, client_id) => {
        if (this.users[client_id]) {
            this.users[client_id].write(this.convertMessage(message));
        }
    };
    
    @Public()
    @Get()
    async getEvents(@Req() req, @Res() res, next) {
        try {
            let { client_id, token } = req.query;
            let user = null;
            if (!client_id) {
                client_id = randomUUID();
            }
            this.users[client_id] = res;

            res.on("close", () => {
                console.log("close", client_id);
                delete this.users[client_id];
            });

            const headers = {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            };
            res.writeHead(200, headers);

            setInterval(() => {
                this.broadcastUnknown(
                    { type: "connect", client_id },
                    client_id
                );
            }, 5000);
        } catch (err) {
            console.error(err);
            next();
        }
    }

}
