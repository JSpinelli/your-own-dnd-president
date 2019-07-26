import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/shared/ApiResponse.model';
import { ApiInfo } from './api-info.service';


@Component({
    selector: 'app-show-api-info',
    templateUrl: './show-api-info.component.html',
    styleUrls: ['./show-api-info.component.css'],
  })
 export class ShowApiInfoComponent implements OnInit{

    @Input() apiResponse: ApiResponse;

    constructor(private apiInfo: ApiInfo) {}

    ngOnInit(){
        console.log(this.apiResponse);
    }
 }
