import {Component, OnChanges, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {PaymentService} from '../../service/payment/payment.service';
import {Transaction} from '../../model/Transaction';
import {SharingDataService} from '../../buy-ticket/sharing-data.service';
import {Showtime} from '../../model/showtime';

@Component({
  selector: 'app-booking-information-booking-ticket',
  templateUrl: './booking-information-booking-ticket.component.html',
  styleUrls: ['./booking-information-booking-ticket.component.css']
})
export class BookingInformationBookingTicketComponent implements OnInit {
  showTime : Showtime ;


  constructor(private paymentService: PaymentService,
              private  sharingDataService: SharingDataService) {
  }



  receiveObj: any;
  public payPalConfig ?: IPayPalConfig;
  check = false;

  ngOnInit(): void {
    this.sharingDataService.obj.subscribe(value => {
      this.receiveObj = value;
      // console.log(this.receiveObj['showtime']);

      this.initConfig();
    });
  }

  transaction: Transaction
    = {
    code: '1',
    transactionalDate: '2000-22-09',
    ticketStatus: '1',
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
    },

  };


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

        //lấy thông tin showtime còn thông tin member nữa là xong
     this.transaction.showTime =this.receiveObj['showtime'];

        this.paymentService.payment(this.transaction).subscribe(value => {
              this.transaction =value;
          console.log(this.transaction);
        });
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
