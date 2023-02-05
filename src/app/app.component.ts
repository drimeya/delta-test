import { Input, Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

interface MyDate {
  'day': string,
  'month' : string,
  'year': string
}

interface Dates {
  [key: string]: string
}

interface Metods {
  [key: string]: Res
}

interface MyDataInDay {
  'checkId': number,
  'paymentMethod': string,
  'clientId': number,
  'removeBeforePay': number,
  'removeAfterPay': number,
  'summ': number
}

interface MyData {
  [key: string]: MyDataInDay[]
}

interface ClientSum {
  [key: number]: number
}

interface Res {
  's': string | number,
  'p': number | undefined
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'delta-test';
  countDays: number = 2;
  Object = Object;

  data: MyData = {
    '05.02.2023': [
      {
      'checkId': 1,
      'paymentMethod': 'credit',
      'clientId': 1,
      'removeBeforePay': 60,
      'removeAfterPay': 0,
      'summ': 2460
      },
      {
      'checkId': 2,
      'paymentMethod': 'card',
      'clientId': 1,
      'removeBeforePay': 60,
      'removeAfterPay': 0,
      'summ': 2460
      }],
    '04.02.2023': [
      {
      'checkId': 4,
      'paymentMethod': 'nal',
      'clientId': 1,
      'removeBeforePay': 60,
      'removeAfterPay': 0,
      'summ': 2460
      },
      {
      'checkId': 6,
      'paymentMethod': 'nal',
      'clientId': 2,
      'removeBeforePay': 60,
      'removeAfterPay': 0,
      'summ': 2460
      }],
    '29.01.2023': [
      {
      'checkId': 7,
      'paymentMethod': 'nal',
      'clientId': 1,
      'removeBeforePay': 60,
      'removeAfterPay': 0,
      'summ': 1200
      },
      {
      'checkId': 9,
      'paymentMethod': 'nal',
      'clientId': 1,
      'removeBeforePay': 60,
      'removeAfterPay': 0,
      'summ': 2460
      }],
    '30.01.2023': [
      {
      'checkId': 7,
      'paymentMethod': 'nal',
      'clientId': 1,
      'removeBeforePay': 60,
      'removeAfterPay': 0,
      'summ': 1200
      },
      {
      'checkId': 9,
      'paymentMethod': 'nal',
      'clientId': 1,
      'removeBeforePay': 60,
      'removeAfterPay': 0,
      'summ': 2460
      }]
  }

  dates = this.getDates();
  currDate = 'Выбрать день';

  public getMetods(key:string = 'today') {
    let methods: Metods = {
       'Выручка, руб.': this.calcRevenue(this.dates[key]),
       'Наличные, руб.': this.calcByPayment(this.dates[key], 'nal'),
       'Безналичный расчет, руб.': this.calcByPayment(this.dates[key], 'card'),
       'Креднитные карты, руб.': this.calcByPayment(this.dates[key], 'credit'),
       'Средний чек, руб.': this.calcMediumCheck(this.dates[key]),
       'Средний гость, руб.': this.calcMediumClient(this.dates[key]),
       'Удаления из чека(после оплаты), руб.': this.calcRemoveAfterPay(this.dates[key]),
       'Удаления из чека(до оплаты), руб.': this.calcRemoveBeforePay(this.dates[key]),
       'Количество чеков': this.calcCount(this.dates[key]),
       'Количество гостей': this.calcClients(this.dates[key])
     }
     return methods;
  }

  todayCache: Metods = {
    'calcRevenue': this.calcRevenue(this.dates['today']),
    'calcByPaymentNal': this.calcByPayment(this.dates['today'], 'nal'),
    'calcByPaymentCard': this.calcByPayment(this.dates['today'], 'card'),
    'calcByPaymentCredit': this.calcByPayment(this.dates['today'], 'credit'),
    'calcMediumCheck': this.calcMediumCheck(this.dates['today']),
    'calcMediumClient': this.calcMediumClient(this.dates['today']),
    'calcRemoveAfterPay': this.calcRemoveAfterPay(this.dates['today']),
    'calcRemoveBeforePay': this.calcRemoveBeforePay(this.dates['today']),
    'calcCount': this.calcCount(this.dates['today']),
    'calcClients': this.calcClients(this.dates['today'])
  }
  public isRercent(val: any): boolean {
    if (typeof(val) === 'number' &&  !(val === Infinity || val === -Infinity) && !Number.isNaN(val) && val !== 0) {
      return true;
    } else {
      return false;
    }
  }
  
  public isPossitive(val: any) {
    if (this.isRercent(val)) {
      if (val > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  public isNegative(val: any) {
    if (this.isRercent(val)) {
      if (val < 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public getDates() {
    let today = new Date();
    let todayStr = this.stringDate(today);
    let dates: Dates = {
      'today': todayStr,
      'yesterday': this.setDate(1),
      'onLastWeek': this.setDate(7)
    }
    return dates
  }

  private setDate(n:number) {
    let day = new Date();
    day.setDate(day.getDate() - n);
    let dayStr = this.stringDate(day);
    return dayStr;
  }
 
  public stringDate(theDate: Date) {
    let date: MyDate = {
      'day': theDate.getDate().toString(),
      'month': (theDate.getMonth() + 1).toString(),
      'year': theDate.getFullYear().toString(),
    }
    if (date.day.length < 2) {
      date.day = "0" + date.day;
    }
    if (date.month.length < 2) {
      date.month = "0" + date.month;
    }
    return date.day + '.' + date.month + '.' + date.year;
  }

  public getAllDates() {
    let dates: string[] = [];
    for (let key in this.data) {
      dates.push(key);
    }
    return dates;
  }

  public addDate(item:string) {
    this.dates['last'] = item;
  }
  
  public calcCount(date: string) {
    let s, p;
    if (this.data[date]) {
      s = this.data[date].length;
      p = this.calcPresents(date, 'calcCount', s);
    } else {
      s =  "Нет данных";
    }
    const res: Res = {
      's': s,
      'p': p
    }
    return res;
  }

  public calcRevenue(date: string) {
    let s, p;
    if (this.data[date]) {
      s = 0;
      for (let item of this.data[date]) {
        s += item.summ;
      }
      p = this.calcPresents(date, 'calcRevenue', s);
    } else {
      s = "Нет данных";
    }
    const res: Res = {
      's': s,
      'p': p
    }
    return res;
  }

  public calcClients(date: string) {
    let s, p;
    if (this.data[date]) {
      let arr: number[] = [];
      for (let item of this.data[date]) {
        if (arr.includes(item.clientId)) {
          continue;
        } else {
          arr.push(item.clientId);
        }
      }
      s = arr.length;
      p = this.calcPresents(date, 'calcClients', s);
    } else {
      s = "Нет данных";
    }
    const res: Res = {
      's': s,
      'p': p
    }
    return res;
  }

  public calcRemoveAfterPay(date: string) {
    let s, p;
    if (this.data[date]) {
      s = 0;
      for (let item of this.data[date]) {
        s += item.removeAfterPay
      }
      p = this.calcPresents(date, 'calcRemoveAfterPay', s);
    } else {
      s =  "Нет данных";
    }
    const res: Res = {
      's': s,
      'p': p
    }
    return res;
  }

  public calcRemoveBeforePay(date: string) {
    let s, p;
    if (this.data[date]) {
      s = 0;
      for (let item of this.data[date]) {
        s += item.removeBeforePay
      }
      p = this.calcPresents(date, 'calcRemoveBeforePay', s);
    } else {
      s = "Нет данных";
    }
    const res: Res = {
      's': s,
      'p': p
    }
    return res;
  }

  public calcMediumCheck(date: string) {
    let s, p;
    if (this.data[date]) {
      let a = 0;
      for (let item of this.data[date]) {
        a += item.summ
      }
      s = a/this.data[date].length
      p = this.calcPresents(date, 'calcMediumCheck', s);
    } else {
      s = "Нет данных";
    }
    const res: Res = {
      's': s,
      'p': p
    }
    return res;
  }

  public calcMediumClient(date: string) {
    let s, p;
    if (this.data[date]) {
      let arr: ClientSum = {};
      for (let item of this.data[date]) {
        if (arr[item.checkId]) {
          arr[item.checkId] = arr[item.checkId] + item.summ
        } else {
          arr[item.checkId] = item.summ
        }
      }

      s = 0;
      for (let i in arr) {
        s += arr[i]
      }
      s = (s/Object.keys(arr).length)
      p = this.calcPresents(date, 'calcMediumClient', s);
    } else {
      s = "Нет данных";
    }
    const res: Res = {
      's': s,
      'p': p
    }
    return res;
  }

  public calcByPayment(date: string, method: string) {
    let s, p;
    if (this.data[date]) {
      s = 0;
      for (let item of this.data[date]) {
        if (item.paymentMethod == method) {
          s += item.summ;
        }
      }
      if (method == 'nal') {
        p = this.calcPresents(date, 'calcByPaymentNal', s);
      } else if (method == 'card') {
        p = this.calcPresents(date, 'calcByPaymentCard', s);
      } else if (method == 'credit') {
        p = this.calcPresents(date, 'calcByPaymentCredit', s);
      }
    } else {
      s = "Нет данных";
    }
    const res: Res = {
      's': s,
      'p': p
    }
    return res;
  }

  public calcPresents(date: string, method: string, s: number) {
    let p;
    if (date !== this.dates['today']) {
      const todaySum = this.todayCache[method]['s'];
      if(typeof(todaySum) ==  "number") {
        p = ((todaySum - s)/s) * 100
        p = Math.floor(p);
      }
    }
    return p;
  }

  //график

  public setDataForCharts() {
    let labels: string[] = [];
    for (let item in this.dates) {
      labels.push(this.dates[item]);
    }
    labels.reverse();
    console.log(labels);

    let datas: Array<any> = [];
    for (let item in this.dates) {
      datas.push(this.calcRevenue(this.dates[item])['s']);
    }
    datas.reverse();

    const chart = {
      'labels': labels,
      'data': datas
    }
    return chart;
  }

  drawChart(){
    setTimeout(()=> {
      let clone = JSON.parse(JSON.stringify(this.lineChartData));
      this.lineChartData=clone;
    },100)   
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.setDataForCharts()['labels'],
    datasets: [
      {
        data: this.setDataForCharts()['data'],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor() {
  }
}
