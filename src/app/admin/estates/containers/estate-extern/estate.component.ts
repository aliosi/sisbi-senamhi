import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EstatesService} from '../../../../core/services/estates.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EstatesExternItem} from '../../../../core/models/estates-intern.model';
import {MarksService} from '../../../../core/services/marks.service';
import {MarkItem} from '../../../../core/models/mark.model';
import {MarkModelsService} from '../../../../core/services/marks-models.service';
import {VenuesService} from '../../../../core/services/venues.service';
import {VenuesItem} from '../../../../core/models/venues.model';


@Component({
  selector: 'app-estate-intern',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.scss']
})
export class EstateExternComponent implements AfterViewInit, OnInit {
  estatesExtern: EstatesExternItem;
  disableSelect = new FormControl(false);
  datos: any = {lista: '', msg: '', error: ''};
  datosget: any = {marca: '', smg: '', error: ''};
  hidebutoon: boolean;
  lismarcas: MarkItem;
  lismodelos: any;
  lissedes: VenuesItem[];
  formactive = true;

  constructor(
    private estateService: EstatesService,
    private marksService: MarksService,
    private modelsService: MarkModelsService,
    private venuesService: VenuesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.allMarks();
    this.allModels();
    this.getAllVenues();
  }

  ngAfterViewInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        setTimeout(() => {
          this.getEstateExtern(params.id);
        }, 500);
      } else {
        this.disableSelect = new FormControl(true);
      }
    });
  }


  createEstateExtern(data) {
    this.hidebutoon = true;
    this.estateService.createEstatesExter(data)
      .subscribe(
        res => {
          this.datos = res;
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            this.hidebutoon = true;
            this.router.navigate(['./admin/bienes/externos']);
            this.toastr.success(this.datos.msg);
          }
        }
      );
  }

  private getEstateExtern(id: number) {
    this.formactive = false;
    this.estateService.getEstatesExter(id)
      .subscribe(
        res => {
          this.datosget = res.lista[0];
          this.disableSelect.setValue(false);
          this.estatesExtern = this.datosget;
          console.log('entra a estate');
          this.formactive = true;
        }
      );
  }


  updateEstateExtern(data) {
    this.hidebutoon = true;
    this.estateService.updateEstatesExtern(this.estatesExtern.id, data)
      .subscribe(
        res => {
          this.datos = res;
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            this.router.navigate(['./admin/bienes/externos']);
            this.toastr.success(this.datos.msg);
            this.hidebutoon = true;
          }
        }
      );
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

  getmodelosporMarca(id: number) {
    this.modelsService.getModelforMark(id)
      .subscribe(res => {
        this.lismodelos = res.lista;
      });
  }


}
