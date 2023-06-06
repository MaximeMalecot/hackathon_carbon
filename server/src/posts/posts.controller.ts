import { Controller, Get, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PostService } from "./posts.service";

@ApiTags("posts")
@Controller("posts")
export class PostController {
    private users = [];
    constructor(private readonly eventService: PostService) {}

    @Get()
    async getPosts(@Req() req, @Res() res, next) {
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
                this.eventService.broadcastSpecific(
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
