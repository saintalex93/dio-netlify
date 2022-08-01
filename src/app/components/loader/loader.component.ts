import { Component } from '@angular/core';
import { Subject } from 'rxjs'
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  constructor(private loaderService: LoaderService) { }


  isLoading(){
    return this.loaderService.isLoading;
  }

}
