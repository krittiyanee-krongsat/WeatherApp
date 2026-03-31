import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

interface GeoResults {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  population: number;
}

interface GeoResponse {
  results: GeoResults[]; // ใช้ GeoResults[] แทน object ไม่มี type
}

interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    windspeed_10m: number;
    weathercode: number;
  };
  daily:{
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    //Step 1: Geocoding
    return this.http.get<GeoResponse>(
       `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en`
    ).pipe(
      switchMap(geo => {
        const { latitude, longitude} = geo.results[0];
        //Step 2: Weather
        return this.http.get<WeatherResponse>(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
      })
    );
  }
}
