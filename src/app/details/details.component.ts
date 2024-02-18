import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgFor, NgIf,],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private product: string = ''
  private detail: string = ''
  public detailKey: string[] = []
  public detailValue: string[] | any[] = []
  public dropdown: boolean = false

  constructor(route: ActivatedRoute, private http: HttpClient) {
    route.params.subscribe(params => {
      this.product = params['products']
      this.detail = params['details']
    })
    console.log(this.product, this.detail);
  }
  ngOnInit(): void {
    this.http.get<Products>(`https://wizard-world-api.herokuapp.com/${this.product}/${this.detail}`).subscribe(res => {
      this.detailKey = Object.keys(res);
      this.detailValue = Object.values(res);
      // console.log(this.detailValue);
    })
  }
  isString = (value:any):boolean => {
    return typeof value === "string"
  }
  toStringObject(value:object) {
    return Object.entries(value).map(([key,value]) => ` ${key} : ${value}`)
  }
}
