import { Component, ChangeDetectorRef } from '@angular/core';
import { WeatherService } from '../weather';

@Component({
  selector: 'app-weather',
  standalone: false,
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
  city = '';
  displayCity ='';
  weather: any = null;
  loading = false;
  error = '';

  constructor(
    private WeatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}

    get weatherImage(): string {
      if (!this.weather) return '/images/Menu.jpg';
      const MaxTemp = this.weather.daily.temperature_2m_max[0];
      const MinTemp = this.weather.daily.temperature_2m_min[0];

      // ถ้า Max > 25 และ Min >= 25 = ร้อน 
      if (MaxTemp > 25 && MinTemp >= 25) return '/images/WeatherWarm.jpg';
      // นอกนั้น = เย็น
      return '/images/WeatherCold.jpg';
    }

    search() {
      if(!this.city.trim()) return;
      this.loading = true;
      this.error = '';

      const searchCity = this.city.trim();
      this.displayCity = searchCity;
      this.city = '';
      
      this.WeatherService.getWeather(searchCity).subscribe({
        next: (data) => {
          this.weather = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error:() => {
          this.error = 'Not Found Information. Please Try Again';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
}
