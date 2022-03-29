import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {StatisticalFilmService} from "../../service/statistical-film.service";
import Swal from "sweetalert2";
import {StatisticalMemberService} from "../../service/statistical-member.service";
@Component({
  selector: 'app-statistical-common-management',
  templateUrl: './statistical-common-management.component.html',
  styleUrls: ['./statistical-common-management.component.css']
})
export class StatisticalCommonManagementComponent implements OnInit {
  public nameFilm: string[] = [];
  private totalTicketFilm: number[] = [];
  private totalMoneyFilm: number[] = [];
  private options: any;
  private nameMember: string[] = [];
  private totalTicketMember: number[] = [];
  private totalMoneyMember: number[] = [];
  private pointMember: number[] = [];
  quarter: string = "";
  year: string = "";
  constructor(private statisticalFilmService: StatisticalFilmService,
              private statisticalMemberService: StatisticalMemberService) {
  }

  ngOnInit(): void {
    this.statisticalFilmService.getAllTopFilm().subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        this.nameFilm[i] = value[i].name
        this.totalMoneyFilm[i] = Number(value[i].totalTicket)
        this.totalMoneyFilm[i] = Number(value[i].totalMoney)
      }
      this.options = {
        chart: {
          height:450,
          type: 'cylinder',
          options3d: {
            enabled: true,
            alpha: 0,
            beta: 0,
            depth: 50,
            viewDistance: 30
          }
        },
        title: {
          text: 'Danh sách TOP phim có doanh thu cao nhất',
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        xAxis: {
          lineColor: '#fff',
          categories: this.nameFilm,
          crosshair: true,
        },
        plotOptions: {
          series: {
            depth: 25,
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        series: [
          {
            name: 'Vé bán được',
            color: '#506ef9',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:10px">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:f} vé</b></td></tr>',
            },
            data: this.totalTicketFilm,
          },
          {
            name: 'Tổng tiền',
            color: 'rgb(43, 144, 143)',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:10px">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y: f} đồng</b></td></tr>',
            },
            data: this.totalMoneyFilm
          },
        ],
      };
      Highcharts.chart('film', this.options);
    })
    this.statisticalMemberService.getAllTopMember(this.quarter, this.year).subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        this.nameMember[i] = value[i].id + ' - ' + value[i].name
        this.totalTicketMember[i] = Number(value[i].totalTicket)
        this.totalMoneyMember[i] = Number(value[i].totalMoney)
        this.pointMember[i] = Number(value[i].point)
      }
      this.options = {
        chart: {
          height: 450,
          type: 'cylinder',
          options3d: {
            enabled: true,
            alpha: 0,
            beta: 0,
            depth: 50,
            viewDistance: 30
          }
        },
        title: {
          text: 'Danh sách TOP thành viên'
        },
        plotOptions: {
          series: {
            depth: 25,
          }
        },
        xAxis: {
          categories: this.nameMember,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:15px;padding-left: 40px;">{point.key}</span><table>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        series: [
          {
            name: 'Số lượng vé',
            color: 'rgb(43, 144, 143)',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:8px;">{series.name}: </td>' +
                '<td style="padding:3px"><b>{point.y: f} vé</b></td></tr>',
            },
            data: this.totalTicketMember,
          },
          {
            name: 'Tổng tiền',
            color: 'rgb(145, 232, 225)',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:8px">{series.name}: </td>' +
                '<td style="padding:3px"><b>{point.y: f} đồng</b></td></tr>',
            },
            data: this.totalMoneyMember,
          },
          {
            name: 'Điểm tích lũy',
            color: 'rgb(128, 133, 233)',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:8px">{series.name}: </td>' +
                '<td style="padding:3px"><b>{point.y: f} điểm</b></td></tr>',
            },
            data: this.pointMember
          },
        ],
      };
      Highcharts.chart('member', this.options);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Không có dữ liệu cho lựa chọn của bạn',
      })
    })
  }

  list = ['01/03/2022', '03/03/2022', '9/03/2022', '12/03/2022', '15/03/2022', '18/03/2022',
    '21/03/2022', '24/03/2022', '27/03/2022', '30/03/2022'];
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'spline',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Doanh thu tháng 3',
    },
    yAxis: {
      lineColor: '#fff',
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      lineColor: 'rgb(145, 232, 225)',
      categories: this.list,
    },

    plotOptions: {
      series: {
        borderRadius: 5,
      } as any,
    },

    series: [
      {
        name: 'Doanh thu',
        type: 'spline',
        color: 'rgb(145, 232, 225)',
        data: [
          {y: 20000000},
          {y: 30000000},
          {y: 40000000},
          {y: 10000000},
          {y: 20000000},
          {y: 5000000},
          {y: 65000000},
          {y: 80000000},
        ],
      },
    ],
  };
}
