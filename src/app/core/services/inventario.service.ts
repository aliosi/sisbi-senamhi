import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {routes_back} from '../../common/util/constants';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(
    private http: HttpClient

  ) { }

  getSedes()  {
    return this.http.get<any>(routes_back.SISBI_SEDES_SERVICE_API);
  }

  getAniosInv()  {
    return this.http.get<any>(routes_back.SISBI_ANIOS_INV_API);
  }

  getSedeInv(user:any)  {
    return this.http.get<any>(`${routes_back.SISBI_SEDE_USER_API}/?user=${user}`);
  }

  getInvSede(data:any)  {
    if(data.cod){
      return this.http.get<any>(`${routes_back.SISBI_INV_SEDE_API}?anio=${data.anio}&sede=${data.sede}&codPatri=${data.cod}`);
    }else{
      return this.http.get<any>(`${routes_back.SISBI_INV_SEDE_API}?anio=${data.anio}&sede=${data.sede}`);
    }
  }

  getReportInv(data:any)  {
    if(data.cod){
      return this.http.get<any>(`${routes_back.SISBI_REPORT_INV_API}?anio=${data.anio}&sede=${data.sede}&codPatri=${data.cod}`);
    }else{
      return this.http.get<any>(`${routes_back.SISBI_REPORT_INV_API}?anio=${data.anio}&sede=${data.sede}`);
    }
  }

  getReportConfi(data:any){
    if(data.cod){
      return this.http.get<any>(`${routes_back.SISBI_REPORT_CONF_API}?sede=${data.sede}&codPatri=${data.cod}`);
    }else{
      return this.http.get<any>(`${routes_back.SISBI_REPORT_CONF_API}?sede=${data.sede}`);
    }
  }

  getReportSin(data:any){
    if(data.cod){
      return this.http.get<any>(`${routes_back.SISBI_REPORT_SIN_API}?sede=${data.sede}&codPatri=${data.cod}`);
    }else{
      return this.http.get<any>(`${routes_back.SISBI_REPORT_SIN_API}?sede=${data.sede}`);
    }
  }


}




