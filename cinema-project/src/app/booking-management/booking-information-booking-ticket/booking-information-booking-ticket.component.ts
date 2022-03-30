import {Component, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {PaymentService} from '../../service/payment/payment.service';
import {Transaction} from '../../model/Transaction';

@Component({
  selector: 'app-booking-information-booking-ticket',
  templateUrl: './booking-information-booking-ticket.component.html',
  styleUrls: ['./booking-information-booking-ticket.component.css']
})
export class BookingInformationBookingTicketComponent implements OnInit {


  transaction: Transaction = {
    code: '1',
    transactionalDate: '2000-22-09',
    ticketStatus: '1',
    showTime: {
      id: 1,
      date: '3/25/2022',
      name: '10:00',
      screen: {
        id: 1,
        name: 'Screen 01'
      },
      film: {
        id: 1,
        name: 'Bóng Đè',
        duration: '101 phút',
        startDate: '3/17/2022',
        endDate: '3/30/2022',
        filmType: {
          id: 1,
          name: 'Kinh dị'
        },
        actor: 'Quang Tuấn, Thanh Mỹ, Cát Vi, Diệu Nhi',
        director: 'Lê Văn Kiệt',
        studio: 'New Arena',
        image: 'https://www.galaxycine.vn/media/2022/2/18/300_1645169819244.jpg',
        trailer: 'https://youtu.be/Qm8iwrgXkqU',
        version: '2d',
        flagDelete: 1
      }
    },
    member: {
      id: '1',
      name: 'Nguyễn Văn A',
      gender: 1,
      phone: '0901231231',
      email: 'anguyen@gmail.com',
      address: 'Lý Thái Tổ',
      point: 100.0,
      image: 'ava1',
      dateOfBirth: '2000-01-01',
      identityNumber: '123123123'
    }

  };

  constructor(private paymentService: PaymentService) {
  }

  public payPalConfig ?: IPayPalConfig;
  check = false;

  ngOnInit(): void {
    this.initConfig();
  }


  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'pay',
        layout: 'horizontal',
        size: 'small',
        tagline: false

      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        this.paymentService.payment(this.transaction).subscribe();
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  show() {
    this.check = !this.check;
  }
}
