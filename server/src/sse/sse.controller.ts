import { Controller, Get, Req, Res } from "@nestjs/common";
import { SseService } from "./sse.service";

@Controller("sse")
export class SseController {
    constructor(private sseService: SseService) {}

    @Get()
    async getSse(@Req() req, @Res() res, next) {
        try {
            const userId = req.user.id;
            this.sseService.addUser(req.user.id, res);

            res.on("close", () => {
                console.log("close", userId);
                this.sseService.deleteUser(userId);
            });

            const headers = {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            };
            res.writeHead(200, headers);

            setInterval(() => {
                this.sseService.broadcastSpecific(
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
