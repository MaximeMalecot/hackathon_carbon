import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Event } from "./schemas/event.schema";

@Injectable()
export class EventService {
    private users = [];
    private entreprises = {};
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

    convertMessage = ({ type, ...data }) => {
        console.log(`event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`);
        return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
    };

    broadcastUnknown = (message, client_id) => {
        if (this.users[client_id]) {
            this.users[client_id].write(this.convertMessage(message));
        }
    };

    addUser = (client_id, res) => {
        this.users[client_id] = res;
    };

    deleteUser = (client_id) => {
        delete this.users[client_id];
    };
}
