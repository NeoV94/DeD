import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule} from '@angular/forms';
import {ServiceModule} from './service/service.module';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ServiceModule,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
