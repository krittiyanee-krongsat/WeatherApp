import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Weather } from './weather/weather';

@NgModule({
  declarations: [
    App, 
    Weather
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ],
  bootstrap: [App],
})
export class AppModule {}
