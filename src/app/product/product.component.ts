import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Products } from '../interface';
import { NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgxPaginationModule, NgIf, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  public product!: string;
  public p: number = 1;
  public headers!: string[];
  public searchInput: string = '';
  public productList!: Array<Products>
  public filteredList: Products[] = [];

  constructor(route: ActivatedRoute, private http: HttpClient) {
    route.params.subscribe(params => this.product = params['products'])
  }
  ngOnInit(): void {
    const params = new HttpParams()
    console.log(params)
    this.http.get<Array<Products>>(`https://wizard-world-api.herokuapp.com/${this.product}`).subscribe(res => {
      this.productList = res
      this.headers = Object.keys(res[0]).slice(0, 4);
      console.log(res)
    })
  }
  filterInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.searchInput = value
    const regex = new RegExp('^' + value, 'i')
    let filter = this.productList.filter(product => Object.values(product).some(el => regex.test(el)))
    this.filteredList = filter
    console.log(this.filteredList);

  }
  isObjectOfType(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }
}
