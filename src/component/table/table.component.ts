import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(public api:ApiService){}
  data:any;
  keys:any=[];
  ngOnInit(): void{
    this.getData()
  }
  getData(){
    this.api.fetchData(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`,{},"GET").subscribe(data=>{
      console.log(data);
      this.data=data["Time Series (5min)"]
      console.log(this.data)
      for(let key in this.data){
        this.data[key].date=key;
        console.log(this.data[key])
        this.keys.push(this.data[key])
      }
    })
  }
}
