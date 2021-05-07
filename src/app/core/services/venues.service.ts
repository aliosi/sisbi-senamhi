import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {routes_back} from '../../common/util/constants';
import {VenuesModel} from '../models/venues.model';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAllVenues() {
    return this.http.get<VenuesModel>(routes_back.SISBI_SEDES_SERVICE_API);
  }

}
