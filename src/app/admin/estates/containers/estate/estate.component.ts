import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import {EstatesService} from '../../../../core/services/estates.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MarksService} from '../../../../core/services/marks.service';
import {MarkModelsService} from '../../../../core/services/marks-models.service';
import {VenuesService} from '../../../../core/services/venues.service';
import {VenuesItem} from '../../../../core/models/venues.model';
import {EstateItem, EstateSolicitudItem} from '../../../../core/models/estates-intern.model';
import {SubcategoryService} from '../../../../core/services/subcategory.service';
import swal from 'sweetalert';
import {MarkItem} from '../../../../core/models/mark.model';



@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss']
})
export class EstateComponent implements OnInit {
  estatesIntern: EstateItem;
  datasolicitud: EstateSolicitudItem;
  disableSelect = false;
  datos: any = {lista: '', msg: '', error: ''};
  datosget: any = {marca: '', smg: '', error: ''};
  hidebutoon: boolean;
  lismarcas: MarkItem[];
  lismodelos: any;
  lissedes: VenuesItem[];
  lissubcategorias: any;
  isNewsolicitud;
  disableedit = false;
  formrequest = false;
  cargaform;

  constructor(
    private estateService: EstatesService,
    private marksService: MarksService,
    private modelsService: MarkModelsService,
    private venuesService: VenuesService,
    private subcategoryService: SubcategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.allMarks();
    this.allModels();
    this.getAllVenues();
    this.getAllSubcategoria();
    this.route.params.subscribe((params: Params) => {
      if (params.creacion) {
        // console.log('entra a crear');
        this.isNewsolicitud = true;
        this.formrequest = true;
        // console.log('estado form');
        this.getEstateIntern(params.creacion);

      } else if (params.validacion) {
        /* console.log('entra a validacion'); */
        this.isNewsolicitud = false;
        this.formrequest = true;
        this.cargaform=false;
        this.disableedit = true;
        this.getsolicitudbyid(params.validacion);
      } else if (params.id) {
        this.formrequest = false;
        console.log('modificar registro');
        setTimeout(() => {
          this.getEstateIntern(params.id);
          this.disableedit = true;
        }, 500);
      } else {
        this.formrequest = false;
        console.log('nuevo registro');
        this.disableSelect = true;
        this.cargaform=true;
        console.log(this.formrequest);

      }
    });
  }



  createEstateIntern(data) {
    this.hidebutoon = true;
    this.estateService.createEstatesInter(data)
      .subscribe(
        res => {
          this.datos = res;
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            this.hidebutoon = true;
            this.router.navigate(['./admin/bienes/internos']);
            this.toastr.success(this.datos.msg);
          }
        }
      );
  }

  private getEstateIntern(id: number) {
    this.cargaform = false;
    this.estateService.getEstatesInter(id)
      .subscribe(
        res => {
          this.datosget = res.lista[0];
          this.disableSelect = false;
          /* console.log('hola'); */
          this.estatesIntern = this.datosget;
          /* console.log('--end'); */
          this.cargaform = true;
        }
      );
  }


  updateEstateIntern(data) {
    this.hidebutoon = false;
    swal({
      title: 'Estas seguro de realizar esta acción?',
      text: 'Alerta! los datos serán actualizados',
      icon: 'warning',
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.hidebutoon = true;
          this.estateService.updateEstatesInter(this.estatesIntern.id, data)
            .subscribe(
              res => {
                this.datos = res;
                if (res.error) {
                  this.toastr.error(this.datos.error);
                  this.hidebutoon = false;
                } else {
                  this.router.navigate(['./admin/bienes/internos']);
                  this.toastr.success(this.datos.msg);
                  this.hidebutoon = true;
                }
              }
            );
        }
      });
  }

  solicitudcambio(data) {
    this.hidebutoon = true;
    this.estateService.updateEstatesSolicitudCambio(this.estatesIntern.id, data)
      .subscribe(
        res => {
          this.datos = res;
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            this.router.navigate(['./admin/bienes/internos/listazonales']);
            this.toastr.success(this.datos.msg);
            this.hidebutoon = true;
          }
        }
      );
  }

  getsolicitudbyid(id) {
    this.cargaform = false;
    this.estateService.getSolicitud(id)
      .subscribe(
        res => {
          /* console.log(res.solicitud); */
          this.datasolicitud = res.solicitud;

          // console.log(res);
        }
      );
  }

  aseptarsolicittud(data) {
    swal({
      title: 'Estas seguro de realizar esta acción?',
      text: 'Alerta! una vez valida los datos de este bien serán actualizados',
      icon: 'warning',
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.hidebutoon = true;
          this.estateService.updateEstatesSolicitudAceptacion(this.datasolicitud.id, data)
            .subscribe(
              res => {
                console.log(res);
                this.datos = res;
                if (this.datos.msg) {
                  this.router.navigate(['./admin/bienes/internos/solicitudes']);
                  this.toastr.success(this.datos.msg);
                } else if (this.datos.error) {
                  this.toastr.error(this.datos.error);
                }
              }
            );
        }
      });
  }

  // Combos
  allMarks() {
    this.marksService.getAllMarks()
      .subscribe(res => {
          this.lismarcas = res.lista;
        }
      );
  }

  allModels() {
    this.modelsService.getAllMarkModels()
      .subscribe(res => {
          this.lismodelos = res.lista;
        }
      );
  }

  private getAllVenues() {
    this.venuesService.getAllVenues()
      .subscribe(
        res => {
          this.lissedes = res.listSede;
        }
      );
  }

  private getAllSubcategoria() {
    this.subcategoryService.getAllSubcategory()
      .subscribe(
        res => {
          this.lissubcategorias = res.lista;
        }
      );
  }

  getmodelosporMarca(id: number) {
    this.modelsService.getModelforMark(id)
      .subscribe(res => {
        this.lismodelos = res.lista;
      });
  }
}
