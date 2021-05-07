import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StateModel} from '../models/state.model';
import {routes_back} from '../../common/util/constants';


@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllState() {
    return this.http.get<StateModel[]>(routes_back.SISBI_ESTADO_SERVICE_API);
  }

  getState(id: number) {
    return this.http.get<StateModel>(`${routes_back.SISBI_ESTADO_SERVICE_API}/${id}`);
  }

  createState(state: StateModel) {
    return this.http.post<any>(routes_back.SISBI_ESTADO_SERVICE_API, state);
  }

  updateState(id: number, state: Partial<StateModel>) {
    return this.http.put<any>(`${routes_back.SISBI_ESTADO_SERVICE_API}/${id}`, state);
  }

  deleteState(id: number) {
    return this.http.delete <any>(`${routes_back.SISBI_ESTADO_SERVICE_API}/${id}`);
  }
}
