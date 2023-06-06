import { Controller, Get, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EventService } from "./event.service";

@ApiTags("events")
@Controller("events")
export class EventController {
    private users = [];
    constructor(private readonly eventService: EventService) {}

    @Get()
    async getEvents(@Req() req, @Res() res, next) {
        try {
            const userId = req.user.id;
            this.eventService.addUser(req.user.id, res);

            res.on("close", () => {
                console.log("close", userId);
                this.eventService.deleteUser(userId);
            });

            const headers = {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            };
            res.writeHead(200, headers);

            setInterval(() => {
                this.eventService.broadcastUnknown(
                    { type: "connect", userId },
                    userId
                );
            }, 5000);
        } catch (err) {
            console.error(err);
            next();
        }
    }
}
