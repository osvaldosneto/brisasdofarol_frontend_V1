import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HospedagemService } from '../services/domain/hospedagem.service';
import { ErrorInterceptorProvider } from '../interceptors/error_interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { Calendar } from '@ionic-native/calendar/ngx';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HospedagemService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    Calendar
  ]
})
export class AppModule {}
