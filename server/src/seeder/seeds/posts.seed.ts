import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { EntrepriseService } from "src/entreprise/entreprise.service";
import { PostContentService } from "src/posts-content/posts-content.service";
import { ContentType } from "src/posts-content/schema/post-content.schema";
import { PostService } from "src/posts/posts.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PostSeed {
    constructor(
        private readonly postsService: PostService,
        private readonly postContentService: PostContentService,
        private readonly usersService: UsersService,
        private readonly entrepriseService: EntrepriseService
    ) {}

    @Command({
        command: "db:seed:posts",
        describe: "seed posts",
    })
    async seed() {
        console.log("SEEDING POSTS -----");
        await this.postsService.clear();
        const user = await this.usersService.findOneByEmail("admin@admin.com");
        const entreprises = await this.entrepriseService.getEntreprises();
        let posts = [
            {
                title: "Post 1",
                description: "Description 1",
            },
            {
                title: "Post 2",
                description: "Description 1",
                entrepriseId: faker.helpers
                    .arrayElement(entreprises)
                    ._id.toString(),
            },
        ];
        let dbPosts = [];
        for (let post of posts) {
            const dbPost = await this.postsService.create(user, post);
            dbPosts.push(dbPost);
            console.log(`Created post with id: ${dbPost._id}`);
        }

        for (let post of dbPosts) {
            let postContents = [
                {
                    postId: post._id.toString(),
                    type: ContentType.TEXT,
                    dto: {
                        data: "azezaeaze",
                        order: 0,
                    },
                },
                {
                    postId: post._id.toString(),
                    type: ContentType.FILE,
                    dto: {
                        data: "https://carbon-it.fr/wp-content/uploads/2020/11/cropped-android-chrome-192x192-1.png",
                        order: 1,
                    },
                },
            ];
            for (let postContent of postContents) {
                const content = await this.postContentService.addContent(
                    postContent.postId,
                    postContent.type,
                    postContent.dto
                );
                console.log(`Created content with id: ${content._id}`);
            }
        }

        await this.postsService.publish(dbPosts[0]._id.toString());
    }
}
