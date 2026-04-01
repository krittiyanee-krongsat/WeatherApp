import { Component, ChangeDetectorRef } from '@angular/core';
import { WeatherService } from '../weather';

@Component({
  selector: 'app-weather',
  standalone: false,
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
  // เก็บค่าชื่อเมืองที่ผู้ใช้พิมพ์ใน input
  city = '';
  // เก็บชื่อเมืองที่แสดงบนหน้าจอหลังจากกดค้นหา
  displayCity ='';
  // เก็บข้อมูลสภาพอากาศที่ได้จาก API
  weather: any = null;
  // สถานะกำลังโหลดข้อมูล (true = กำลังโหลด)
  loading = false;
  // ข้อความแสดงเมื่อเกิดข้อผิดพลาด
  error = '';

  constructor(
    private WeatherService: WeatherService, // inject service สำหรับดึงข้อมูลสภาพอากาศ
    private cdr: ChangeDetectorRef // inject สำหรับบังคับ update UI ด้วยตัวเอง
  ) {}

    // getter สำหรับเลือกรูปภาพตามอุณหภูมิ
    get weatherImage(): string {
      // ถ้ายังไม่มีข้อมูลสภาพอากาศ ให้แสดงรูป default
      if (!this.weather) return '/images/Menu.jpg';
      const MaxTemp = this.weather.daily.temperature_2m_max[0]; // อุณหภูมิสูงสุดของวันนี้
      const MinTemp = this.weather.daily.temperature_2m_min[0]; // อุณหภูมิต่ำสุดของวันนี้

      // ถ้า Max > 25 และ Min >= 25 = ร้อน 
      if (MaxTemp > 25 && MinTemp >= 25) return '/images/WeatherWarm.jpg';
      // นอกนั้น = เย็น → แสดงรูปอากาศเย็น
      return '/images/WeatherCold.jpg';
    }

    // ฟังก์ชันค้นหาสภาพอากาศเมื่อผู้ใช้กดปุ่ม search
    search() {
      // ถ้า input ว่างเปล่า ไม่ต้องทำอะไร
      if(!this.city.trim()) return;
      this.loading = true; // เริ่มโหลด
      this.error = ''; // ล้างข้อผิดพลาดเก่า

      const searchCity = this.city.trim(); // ตัด space หัวท้ายออก
      this.displayCity = searchCity; // อัปเดตชื่อเมืองที่แสดงบนหน้าจอ
      this.city = ''; // ล้าง input หลังกดค้นหา
      
      // เรียก API ผ่าน WeatherService
      this.WeatherService.getWeather(searchCity).subscribe({
        // กรณีดึงข้อมูลสำเร็จ
        next: (data) => {
          this.weather = data; // บันทึกข้อมูลสภาพอากาศ
          this.loading = false; // หยุดโหลด
          this.cdr.detectChanges(); // บังคับให้ Angular อัปเดต UI
        },
        // กรณีเกิดข้อผิดพลาด (เช่น หาเมืองไม่เจอ)
        error:() => {
          this.error = 'Not Found Information. Please Try Again'; // แสดงข้อความ error
          this.loading = false; // หยุดโหลด
          this.cdr.detectChanges(); // บังคับให้ Angular อัปเดต UI
        }
      });
    }
}
