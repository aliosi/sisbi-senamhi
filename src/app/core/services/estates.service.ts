import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {routes_back} from '../../common/util/constants';
import {EstateExternModel, EstateInternModel, EstatesExtern, EstatesIntern} from '../models/estate.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EstateSolicitudItem, EstateSolicitudModel} from '../models/estates-intern.model';

@Injectable({
  providedIn: 'root'
})
export class EstatesService {
  constructor(
    private http: HttpClient
  ) {
  }

  //Bienes internos
  // getAllEstatesInter() {
  //   return this.http.get<EstateInternModel>(routes_back.SISBI_BIEN_INT_SERVICE_API);
  // }
  getAllEstatesInter(): Observable<EstateInternModel> {
    return this.http.get(routes_back.SISBI_BIEN_INT_SERVICE_API)
      .pipe(
        map((items: EstatesIntern) => new EstateInternModel(items)
        )
      );
  }

  // getAllEstatesInterZonal(id: number) {
  //   return this.http.get<EstatesIntern>(`${routes_back.SISBI_BIEN_INT_SERVICE_API}?idSede=${id}`);
  // }

  getAllEstatesInterZonal(id: number): Observable<EstatesIntern> {
    return this.http.get(`${routes_back.SISBI_BIEN_INT_SERVICE_API}?idSede=${id}`).pipe(
      map((items: EstatesIntern) => new EstateInternModel(items)
      )
    )
  }

  getEstatesInter(id: number) {
    return this.http.get<EstatesIntern>(`${routes_back.SISBI_BIEN_INT_SERVICE_API}?id=${id}`);
  }

  createEstatesImport(estate: EstatesIntern) {
    return this.http.post<any>(routes_back.SISBI_BIEN_IMPORT_SERVICE_API, estate);
  }

  createEstatesInter(estate: EstatesIntern) {
    return this.http.post<any>(routes_back.SISBI_BIEN_SENAMHI_SERVICE_API, estate);
  }

  updateEstatesInter(id: number, estate: Partial<EstatesIntern>) {
    return this.http.put<any>(`${routes_back.SISBI_BIEN_INT_SERVICE_API}/${id}`, estate);
  }

  // Bienes externos

  // getAllEstatesExter() {
  //   return this.http.get<EstatesExtern>(routes_back.SISBI_BIEN_EXT_SERVICE_API);
  // }
  getAllEstatesExter(): Observable<EstateExternModel> {
    return this.http.get(routes_back.SISBI_BIEN_EXT_SERVICE_API)
      .pipe(
        map((items: EstatesExtern) => new EstateExternModel(items)
        )
      );
  }

  getEstatesExter(id: number) {
    return this.http.get<EstatesExtern>(`${routes_back.SISBI_BIEN_EXT_SERVICE_API}?id=${id}`);
  }

  createEstatesExter(estate: EstatesExtern) {
    return this.http.post<any>(routes_back.SISBI_BIEN_EXT_SERVICE_API, estate);
  }

  updateEstatesExtern(id: number, estate: Partial<EstatesExtern>) {
    return this.http.put<any>(`${routes_back.SISBI_BIEN_EXT_SERVICE_API}/${id}`, estate);
  }


  // SOLICITUDES
  getAllSolicitudes(): Observable<EstateInternModel> {
    return this.http.get(routes_back.SISBI_LISTA_SOLICITUDES_CAMBIOS_BIEN_SERVICE_API)
      .pipe(
        map((items: EstatesIntern) => new EstateInternModel(items)
        )
      );
  }

  getSolicitudesUsuario(user: string) {
    return this.http.get<EstateInternModel>(`${routes_back.SISBI_LISTA_SOLICITUDES_USER_CAMBIOS_BIEN_SERVICE_API}/dz/?user=${user}`);
  }

  updateEstatesSolicitudCambio(id: number, solicitud: Partial<EstateSolicitudItem>) {
    let headers = new HttpHeaders();
    headers = headers.set('token', localStorage.getItem('token'));
    return this.http.post<any>(`${routes_back.SISBI_SOLICITUD_CAMBIO_BIEN_SERVICE_API}/${id}`, solicitud,{headers});

  }

  /* updateEstatesSolicitudAceptacion(id: number, solicitud: Partial<EstateSolicitudItem>) { */
  updateEstatesSolicitudAceptacion(id: number, solicitud: any) {
    return this.http.put<any>(`${routes_back.SISBI_SOLICITUD_CAMBIO_BIEN_SERVICE_API}/${id}`, solicitud);
  }

  getSolicitud(id: number) {
    return this.http.get<EstateSolicitudModel>(`${routes_back.SISBI_SOLICITUD_CAMBIO_BIEN_SERVICE_API}/${id}`);
  }


  // deleteEstates(id: number) {
  //   return this.http.delete <any>(`${routes_back.SISBI_BIEN_INT_SERVICE_API}/${id}`);
  // }
  // public config = {headers: {'Accept': '*/*'}};
}
