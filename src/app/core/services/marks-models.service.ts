import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MarkModelsModel, MarkModelsModele} from '../models/mark-models.model';
import {routes_back} from '../../common/util/constants';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MarkModels} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MarkModelsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllMarkModels(): Observable<MarkModelsModele> {
    return this.http.get(routes_back.SISBI_MODELO_SERVICE_API)
      .pipe(
        map((items: MarkModelsModel) => new MarkModelsModele(items)
        )
      );
  }

  getMarkModels(id: number) {
    return this.http.get<MarkModelsModel>(`${routes_back.SISBI_MODELO_SERVICE_API}/${id}`);
  }

  getModelforMark(id:number){
    return this.http.get<MarkModelsModel>(`${routes_back.SISBI_MODELO_BY_MARK_SERVICE_API}/${id}`);
  }

  createMarkModels(mark: MarkModelsModel) {
    return this.http.post<any>(routes_back.SISBI_MODELO_SERVICE_API, mark);
  }

  updateMarkModels(id: number, mark: Partial<MarkModelsModel>) {
    return this.http.put<any>(`${routes_back.SISBI_MODELO_SERVICE_API}/${id}`, mark);
  }

  deleteMarkModels(id: number) {
    return this.http.delete <any>(`${routes_back.SISBI_MODELO_SERVICE_API}/${id}`);
  }

  httpHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    return headers;
  }
}
