import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypesEstatesModel} from '../models/types-estates.model';
import {routes_back} from '../../common/util/constants';

@Injectable({
  providedIn: 'root'
})
export class TypesEstatesService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllTypesStates() {
    return this.http.get<TypesEstatesModel[]>(routes_back.SISBI_TIPO_BIEN_SERVICE_API);
  }

  getTypesStates(id: number) {
    return this.http.get<TypesEstatesModel>(`${routes_back.SISBI_TIPO_BIEN_SERVICE_API}/${id}`);
  }

  createTypesStates(tstate: TypesEstatesModel) {
    return this.http.post<any>(routes_back.SISBI_TIPO_BIEN_SERVICE_API, tstate);
  }

  updateTypesStates(id: number, tstate: Partial<TypesEstatesModel>) {
    return this.http.put<any>(`${routes_back.SISBI_TIPO_BIEN_SERVICE_API}/${id}`, tstate);
  }

  deleteTypesStates(id: number) {
    return this.http.delete <any>(`${routes_back.SISBI_TIPO_BIEN_SERVICE_API}/${id}`);
  }
}
