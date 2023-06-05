import {
    Injectable
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Event } from "./schema/event.schema";

@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}
}
