import { LoaderInterceptor } from './loader.interceptor';
import { LoaderComponent } from './loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { HTTP_INTERCEPTORS } from '@angular/common/http'


@NgModule({
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ]
})
export class LoaderModule { }
