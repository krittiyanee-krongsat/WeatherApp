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
  weather: any = null;
  loading = false;
  error = '';

  constructor(
    private WeatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}
    search() {
      if(!this.city.trim()) return;
      this.loading = true;
      this.error = '';
      this.WeatherService.getWeather(this.city).subscribe({
        next: (data) => {
          this.weather = data.current;
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
