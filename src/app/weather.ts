import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    //Step 1: Geocoding
    return this.http.get<any>(
       `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en`
    ).pipe(
      switchMap(geo => {
        const { latitude, longitude} = geo.results[0];
        //Step 2: Weather
        return this.http.get<any>(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode`
        );
      })
    );
  }
}
