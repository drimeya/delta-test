import {  Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { HttpClient} from '@angular/common/http';

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
  public title = 'delta-test';
  public Object = Object;
  public loading = false;
  public data: any;
  public todayCache: any;

  public dates = this.getDates();
  public currDate = 'Выбрать день';

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
    let dates: string[] = [
      this.setDate(2),
      this.setDate(3),
      this.setDate(4),
      this.setDate(5),
      this.setDate(6)
    ]
    return dates
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
      s = Math.round(s);
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
        if (Object.keys(arr).includes(item.checkId)) {
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
      s = Math.round(s);
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
  label: string = 'Выручка, руб.';
  lineChartActive: boolean = true;

  public setDataForCharts(method: string = this.label) {
    let labels: string[] = [];
    for (let item in this.dates) {
      labels.push(this.dates[item]);
      //меняю местами последние 2, тк этот день прошлой недели самый последний день из отчета
      if (labels.length == 4) {
        [labels[2], labels[3]] = [labels[3], labels[2]];
      }
      
    }
    labels.reverse();

    let newData: Array<any> = [];
    for (let item in this.dates) {
      for (let key in this.getMetods()) {
        if (key == this.label) {
          newData.push(this.getMetods(item)[key]['s'])
        }
      }
      if (newData.length == 4) {
        [newData[2], newData[3]] = [newData[3], newData[2]];
      }
    }
    newData.reverse();

    const chart = {
      'labels': labels,
      'data': newData
    }
    return chart;
  }

  public refreshGraph() {
    this.lineChartActive = false;
    
    this.lineChartData = {
      labels: this.setDataForCharts()['labels'],
      datasets: [
        {
          data: this.setDataForCharts()['data'],
          label: this.label,
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        }
      ]
    };
    setTimeout(()=>{
      this.lineChartActive = true;
    },100);
  }
  public lineChartLegend = true;
  public lineChartData: any;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };

  constructor(private http: HttpClient) {
  }
  ngOnInit(){
    this.http.get('ajax/api.php').subscribe((res: any)=>{
      if (res) {
        this.data = res;

        for (let item in res) {
          for (let i in res[item]) {
            for (let a in res[item][i]) {
              if (a !== 'paymentMethod' && a!= 'date')
              res[item][i][a] = +res[item][i][a]
            }
          }
        }
        this.data = res;
        this.todayCache = {
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

        this.lineChartData = {
          labels: this.setDataForCharts()['labels'],
          datasets: [
            {
              data: this.setDataForCharts()['data'],
              label: this.label,
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)'
            }
          ]
        };
        this.loading = true;
      }
    })
  }
}