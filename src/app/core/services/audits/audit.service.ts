import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuditoriaModel} from '../../models/auditoria.model';
import {routes_back} from '../../../common/util/constants';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  constructor(
    private http: HttpClient
  ) {
  }

  getAllMarks() {
    return this.http.get<AuditoriaModel[]>(routes_back.SISBI_AUDTORIA_SERVICE_API);
  }
}
