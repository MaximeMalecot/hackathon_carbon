import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URL } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
