import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MarkItem} from '../models/mark.model';
import {routes_back} from '../../common/util/constants';

@Injectable({
  providedIn: 'root'
})
export class MarksService {
  constructor(
    private http: HttpClient
  ) {
  }

  getAllMarks() {
    return this.http.get<any>(routes_back.SISBI_MARCA_SERVICE_API);
  }

  getMark(id: number) {
    return this.http.get<MarkItem>(`${routes_back.SISBI_MARCA_SERVICE_API}/${id}`);
  }

  createMark(mark: MarkItem) {
    return this.http.post<any>(routes_back.SISBI_MARCA_SERVICE_API, mark);
  }

  updateMark(id: number, mark: Partial<MarkItem>) {
    return this.http.put<any>(`${routes_back.SISBI_MARCA_SERVICE_API}/${id}`, mark);
  }

  deleteMark(id: number) {
    return this.http.delete <any>(`${routes_back.SISBI_MARCA_SERVICE_API}/${id}`);
  }

}
