import { AbstractDocument, AbstractRepository } from "@app/common";
import { Injectable, Logger} from "@nestjs/common";
import { UserDocument } from "./models/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersRespository extends AbstractRepository<UserDocument> {
    protected readonly logger = new Logger(UsersRespository.name);

    constructor(
        @InjectModel(UserDocument.name) userModel: Model<UserDocument>
    ) {
        super(userModel);
    }

}