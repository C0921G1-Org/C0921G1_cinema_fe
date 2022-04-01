import {Component, OnChanges, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {PaymentService} from '../../service/payment/payment.service';
import {Transaction} from '../../model/Transaction';
import {SharingDataService} from '../../buy-ticket/sharing-data.service';
import {Showtime} from '../../model/showtime';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-booking-information-booking-ticket',
  templateUrl: './booking-information-booking-ticket.component.html',
  styleUrls: ['./booking-information-booking-ticket.component.css']
})
export class BookingInformationBookingTicketComponent implements OnInit {
  showTime: Showtime;


  constructor(private paymentService: PaymentService,
              private  sharingDataService: SharingDataService,
              private router: Router) {
  }

  transaction: Transaction
    = {
    code: '1',
    transactionalDate: '2000-22-09',
    ticketStatus: '1',
    checkAcceptTicket: 0,
    pointGained: 0.0,
    pointUsed: 0.0
  };


  receiveObj: any;
  public payPalConfig ?: IPayPalConfig;
  check = false;
  sum: any;

  ngOnInit(): void {

    this.sharingDataService.obj.subscribe(value => {
      this.receiveObj = value;
      console.log(this.receiveObj);
      if (this.receiveObj == null) {
        this.router.navigateByUrl('/buy-ticket');
      } else {
        //Tổng tiền thành toán paypal
        this.sum = this.receiveObj.totalPayment / 26000;
        this.initConfig();
      }
    });


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
              value: this.sum,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.sum,
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
                  value: this.sum,
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
        this.transaction.showTime = this.receiveObj['showtime'];
        this.transaction.member = this.receiveObj['member'];
        this.paymentService.payment(this.transaction).subscribe(value => {
          this.transaction = value;
          Swal.fire({
            position: 'center',
            background: '#f8f9fa',
            width: 400,
            heightAuto: true,
            icon: 'success',
            title: 'Bạn đã thanh toán thành công',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
          });
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

  checkbox() {
    Swal.fire({
      position: 'center',
      background: '#f8f9fa',
      width: 400,
      heightAuto: true,
      icon: 'error',
      title: 'Bạn đã hủy thanh toán',
      toast: true,
      showConfirmButton: false,
      timer: 3000,
    });
  }
}
