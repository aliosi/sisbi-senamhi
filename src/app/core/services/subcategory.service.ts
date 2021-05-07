import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubCategoryModel} from '../models/sub-category.model';
import {routes_back} from '../../common/util/constants';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllSubcategory() {
    return this.http.get<SubCategoryModel>(routes_back.SISBI_SUB_CATEGORIA_SERVICE_API);
  }

  getAllMayor() {
    return this.http.get<SubCategoryModel[]>(routes_back.SISBI_SUB_CATEGORIA_MAYOR_SERVICE_API);
  }

  getSubcategory(id: number) {
    return this.http.get<SubCategoryModel>(`${routes_back.SISBI_SUB_CATEGORIA_SERVICE_API}/${id}`);
  }

  createSubcategory(subcategory: SubCategoryModel) {
    return this.http.post<any>(routes_back.SISBI_SUB_CATEGORIA_SERVICE_API, subcategory);
  }

  updateSubcategory(id: number, subcategory: Partial<SubCategoryModel>) {
    return this.http.put<any>(`${routes_back.SISBI_SUB_CATEGORIA_SERVICE_API}/${id}`, subcategory);
  }

  deleteSubcategory(id: number) {
    return this.http.delete <any>(`${routes_back.SISBI_SUB_CATEGORIA_SERVICE_API}/${id}`);
  }
}
