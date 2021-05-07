import {Component, OnInit} from '@angular/core';
import {EstatesService} from '../../../../../../../../core/services/estates.service';
import {FormControl} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EstateSolicitudItem} from '../../../../../../../../core/models/estates-intern.model';

@Component({
  selector: 'app-request-change',
  templateUrl: './request-change.component.html',
  styleUrls: ['./request-change.component.scss']
})
export class RequestChangeComponent implements OnInit {
  estatesSolicitud: any;
  disableSelect = new FormControl(false);
  datos: any = {lista: '', msg: '', error: ''};
  datosget: any = {marca: '', smg: '', error: ''};
  hidebutoon: boolean;
  listsolicitudes: EstateSolicitudItem;

  constructor(
    private estateService: EstatesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {

  }

  allMarks() {
    this.estateService.getAllSolicitudes()
      .subscribe(res => {
          this.datos = res;
          this.listsolicitudes = this.datos.lista;
          console.log(this.datos);
        }
      );
  }

  // createMark(data) {
  //   this.hidebutoon = true;
  //   this.estateService.create(data)
  //     .subscribe(
  //       res => {
  //         this.datos = res;
  //         if (res.error) {
  //           this.toastr.error(this.datos.error);
  //           this.hidebutoon = false;
  //         } else {
  //           // console.log('entraaa regis');
  //           this.hidebutoon = true;
  //           this.router.navigate(['./admin/marcas']);
  //           this.toastr.success(this.datos.msg);
  //         }
  //       }
  //     );
  // }

  private getSolicitud(id: number) {
    this.estateService.getSolicitud(id)
      .subscribe(
        res => {

          // this.datosget = res;
          this.disableSelect.setValue(false);
          this.estatesSolicitud = res.solicitud;
        }
      );
  }

  updateMark(data) {
    this.hidebutoon = true;
    this.estateService.updateEstatesSolicitudAceptacion(this.estatesSolicitud.id, data)
      .subscribe(
        res => {
          this.datos = res;
          // console.log(res);
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            this.router.navigate(['./admin/marcas']);
            this.toastr.success(this.datos.msg);
            this.hidebutoon = true;
          }
        }
      );
  }


}
