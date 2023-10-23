import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from '@app/common/dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  async createCharge(paymentCreateChargeDto: PaymentCreateChargeDto) {
    console.log('paymentCreateChargeDto ', paymentCreateChargeDto);
    return this.paymentsService.createCharge(paymentCreateChargeDto);
  }
}
