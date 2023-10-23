import { CardDto } from "./card.dto";
import { IsDefined, IsNotEmptyObject, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateChargeDto {

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CardDto)
    card: CardDto;

    @IsNumber()
    @IsPositive()
    amount: number;
};