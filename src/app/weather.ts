import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, throwError } from 'rxjs';

/* Interface สำหรับข้อมูลแต่ละเมืองที่ได้จาก Geocoding API */
interface GeoResults {
  latitude: number; // ละติจูด
  longitude: number; // ลองจิจูด
  name: string; // ชื่อเมือง
  country: string; // ชื่อประเทศ
  population: number; // จำนวนประชากร (ใช้กรองเมืองเล็กออก)
}

/* Interface สำหรับ Response ของ Geocoding API (มีหลายผลลัพธ์) */
interface GeoResponse {
  results: GeoResults[]; // ใช้ GeoResults[] แทน object ไม่มี type
}

/* Interface สำหรับ Response ของ Weather API */
interface WeatherResponse {
  current: {
    temperature_2m: number; // อุณหภูมิปัจจุบัน (°C)
    relative_humidity_2m: number; // ความชื้นสัมพัทธ์ปัจจุบัน (%)
    windspeed_10m: number; // ความเร็วลมที่ความสูง 10m (km/h)
    weathercode: number; // รหัสสภาพอากาศ (WMO code)
  };
  daily:{
    temperature_2m_max: number[]; // อุณหภูมิสูงสุดรายวัน (°C)
    temperature_2m_min: number[]; // อุณหภูมิต่ำสุดรายวัน (°C)
  }
}

/* Service สำหรับดึงข้อมูลสภาพอากาศ inject ได้ทั้งแอป */
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  /* ดึงข้อมูลสภาพอากาศจากชื่อเมือง โดยแบ่งเป็น 2 ขั้นตอน */
  getWeather(city: string) {

    // Step 1: Geocoding — แปลงชื่อเมืองเป็นพิกัด (lat, lon)
    return this.http.get<GeoResponse>(
       `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en`
    ).pipe(
      switchMap(geo => {
        const result = geo.results?.[0];

        // ถ้าไม่พบเมือง หรือประชากรน้อยกว่า 1,000 คน ให้โยน error
        // (กันเมืองเล็ก/หมู่บ้านที่ข้อมูลอาจไม่ครบ)
        if (!result || (result.population ?? 0) < 1000) {
          return throwError(() => new Error(`ไม่พบเมือง"${city}"`))
        }

        // ดึงพิกัดจากผลลัพธ์แรก
        const { latitude, longitude} = geo.results[0];

        // Step 2: Weather — ดึงข้อมูลสภาพอากาศจากพิกัดที่ได้
        return this.http.get<WeatherResponse>(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
          // timezone=auto ให้ API ปรับ timezone ตามพิกัดอัตโนมัติ
        );
      })
    );
  }
}
