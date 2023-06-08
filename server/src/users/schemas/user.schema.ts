import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export enum Role {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    ACCOUNT_EDITOR = "ACCOUNT_EDITOR",
    VIEWER = "VIEWER",
    ASSIGNMENT_EDITOR = "ASSIGNMENT_EDITOR",
    NEWS_EDITOR = "NEWS_EDITOR",
    ENTREPRISE_EDITOR = "ENTERPRISE_EDITOR",
    USER = "USER",
}

export const EASY_ROLES = {
    RH: [
        Role.VIEWER,
        Role.ASSIGNMENT_EDITOR,
        Role.ACCOUNT_EDITOR,
        Role.NEWS_EDITOR,
    ],
    COMMERCIAL: [Role.VIEWER, Role.ASSIGNMENT_EDITOR, Role.ENTREPRISE_EDITOR],
};

@Schema()
export class User {
    _id: Types.ObjectId;
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        select: false,
    })
    password: string;

    @Prop({
        type: Date,
        required: true,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        type: Date,
    })
    updatedAt: Date;

    @Prop({
        default: [Role.USER],
    })
    roles: Role[];

    @Prop({
        type: Number,
        required: true,
        default: 0,
    })
    experiencePoints: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
