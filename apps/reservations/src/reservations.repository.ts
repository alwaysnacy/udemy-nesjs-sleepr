import { AbstractDocument, AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ReservationDocument } from "./models/reservation.schema";
import { Model } from "mongoose";

@Injectable()
export class ReservationsRespository extends AbstractRepository<AbstractDocument> {
    protected readonly logger = new Logger(ReservationsRespository.name);

    constructor(
        @InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>
    ) {
        super(reservationModel);
    }
}