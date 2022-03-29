import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';

Histogram(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';

highcharts3D(Highcharts);

import Cylinder from 'highcharts/modules/cylinder';

Cylinder(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
import {StatisticalFilmService} from "../../service/statistical-film.service";

@Component({
  selector: 'app-statistical-film',
  templateUrl: './statistical-film.component.html',
  styleUrls: ['./statistical-film.component.css']
})
export class StatisticalFilmComponent implements OnInit {
  public name: string[] = [];
  private totalTicket: number[] = [];
  private totalMoney: number[] = [];
  private options: any;

  constructor(private statisticalFilmService: StatisticalFilmService) {
  }

  ngOnInit(): void {
    this.statisticalFilmService.getAllTopFilm().subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        this.name[i] = value[i].name
        this.totalTicket[i] = Number(value[i].totalTicket)
        this.totalMoney[i] = Number(value[i].totalMoney)
      }
      this.options = {
        chart: {
          height:540,
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
          text: '',
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        xAxis: {
          lineColor: '#fff',
          categories: this.name,
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
            data: this.totalTicket,
          },
          {
            name: 'Tổng tiền',
            color: 'rgb(43, 144, 143)',
            tooltip: {
              pointFormat: '<tr><td style="color:{series.color};padding:10px">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y: f} đồng</b></td></tr>',
            },
            data: this.totalMoney
          },
        ],
      };
      Highcharts.chart('film', this.options);
    })
  }
}
