import {
    Controller,
    Get,
    Req,
    Res,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { EventService } from "./event.service";

@ApiTags("events")
@Controller("events")
export class EventController {
    private users = []
    constructor(private readonly eventService: EventService) {}

    @Get()
    async getEvents(@Req() req, @Res() res, next) {
        try {
            let { client_id } = req.query;
            if (!client_id) {
                client_id = randomUUID();
            }
            this.eventService.addUser(client_id, res);

            res.on("close", () => {
                console.log("close", client_id);
                this.eventService.deleteUser(client_id);
            });

            const headers = {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            };
            res.writeHead(200, headers);

            setInterval(() => {
                this.eventService.broadcastUnknown(
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
