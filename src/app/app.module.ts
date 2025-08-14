import { NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from '../app/app-routing.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NotFound } from './components/not-found/not-found';
import { provideLottieOptions, LottieComponent } from 'ngx-lottie';
import player from 'lottie-web';
import { NotAproved } from './components/not-aproved/not-aproved';
import { AccessDenied } from './components/access-denied/access-denied';
import { NgxSpinnerModule } from "ngx-spinner";
import { GlobalInterceptor } from './core/interceptor/global.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NotFound,
    NotAproved,
    AccessDenied
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
   LottieComponent,
    NgxSpinnerModule.forRoot(),
     ToastrModule.forRoot(),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideLottieOptions({
      player: () => player // usando import direto
    }),
      {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
