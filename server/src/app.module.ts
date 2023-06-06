import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CommandModule } from "nestjs-command";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DATABASE_URL } from "./constants";
import { ContractModule } from "./contract/contract.module";
import { EntrepriseModule } from "./entreprise/entreprise.module";
import { PostModule } from "./posts/posts.module";
import { QuizModule } from "./quiz/quiz.module";
import { SeederModule } from "./seeder/seeder.module";
import { UsersModule } from "./users/users.module";
import { FormationModule } from './formation/formation.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(DATABASE_URL),
        AuthModule,
        UsersModule,
        QuizModule,
        PostModule,
        EntrepriseModule,
        ContractModule,
        FormationModule,
        CommandModule,
        SeederModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
