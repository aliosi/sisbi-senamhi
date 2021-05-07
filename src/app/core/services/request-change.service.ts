import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestChangeModel} from '../models/request-change.model';
import {routes_back} from '../../common/util/constants';

@Injectable({
  providedIn: 'root'
})
export class RequestChangeService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllRequestChange() {
    return this.http.get<RequestChangeModel[]>(routes_back.SISBI_SOLICITUD_CAMBIO_SERVICE_API);
  }

  getRequestChange(id: number) {
    return this.http.get<RequestChangeModel>(`${routes_back.SISBI_SOLICITUD_CAMBIO_SERVICE_API}/${id}`);
  }

  createRequestChange(rchange: RequestChangeModel) {
    return this.http.post<any>(routes_back.SISBI_SOLICITUD_CAMBIO_SERVICE_API, rchange);
  }

  updateRequestChange(id: number, rchange: Partial<RequestChangeModel>) {
    return this.http.put<any>(`${routes_back.SISBI_SOLICITUD_CAMBIO_SERVICE_API}/${id}`, rchange);
  }

  deleteRequestChange(id: number) {
    return this.http.delete <any>(`${routes_back.SISBI_SOLICITUD_CAMBIO_SERVICE_API}/${id}`);
  }
}
