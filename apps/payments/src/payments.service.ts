import { CreateChargeDto, NOTIFICATIONS_SERVICE, PaymentCreateChargeDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripeService = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
    apiVersion: "2023-10-16"
  });

  constructor(
    private readonly configService: ConfigService, 
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy){}

  async createCharge({card, amount, email}: PaymentCreateChargeDto) {

    const paymentIntent = await this.stripeService.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: "pm_card_visa",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      }
    });

    this.notificationsService.emit("notify_email", {email, html: `<p>Hi there!</p><p></p><p>Your payment of ${amount} had been received!</p>`})
    console.log('email');


    return paymentIntent;
  }

}
