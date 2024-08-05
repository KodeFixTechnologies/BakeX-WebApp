import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './components/interceptor/jwt.interceptor';
import { LoaderInterceptor } from './components/interceptor/loader.interceptor';
import { myCustomLoader } from './services/custom-loader';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),  
    {
        provide:HTTP_INTERCEPTORS,
        useClass:JwtInterceptor,
        multi:true
    },
    provideHttpClient(withInterceptorsFromDi()),  
    {
        provide:HTTP_INTERCEPTORS,
        useClass:LoaderInterceptor,
        multi:true
    },

    provideAnimations(), // required animations providers
    provideToastr(), 


    MessageService,provideAnimations()]
};
