import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faArrowAltCircleLeft, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {MarkItem} from '../../../../../core/models/mark.model';
import {MarkModelsModele} from '../../../../../core/models/mark-models.model';
import {VenuesItem} from '../../../../../core/models/venues.model';
import {EstateItem} from '../../../../../core/models/estates-intern.model';
import {SubcategoriaItem} from '../../../../../core/models/sub-category.model';
import {Router} from '@angular/router';
// import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-estates-form',
  templateUrl: './estates-form.component.html',
  styleUrls: ['./estates-form.component.scss']
})
export class EstatesFormComponent implements OnInit, AfterViewInit {
  mayor: any;
  isNew = true;
  form: FormGroup;
  formsolicitud: FormGroup;
  faArrowLeft = faArrowAltCircleLeft;
  faTimes = faTimesCircle;
  marcas: MarkItem[] = [];
  public filteredMarcas: any;
  modelos: MarkModelsModele[] = [];
  public filteredModelos: any;
  sedes: VenuesItem[] = [];
  public filteredSedes: any;
  subcategory: SubcategoriaItem[] = [];
  public filteredSubcategory: any;
  estate: EstateItem;
  myimage: any;
  date: Date;
  text: any;

  @Input() disableSelect;
  @Input() disableedit;
  @Input() hidebutoon;
  @Input() cargaform;

  @Input()
  set listmarcas(data: MarkItem[]) {
    if (data) {
      this.marcas = data;
      this.filteredMarcas = this.marcas.slice();
    }
  }

  @Input()
  set lismodelos(data: MarkModelsModele[]) {
    if (data) {
      this.modelos = data;
      this.filteredModelos = this.modelos.slice();
    }
  }

  @Input()
  set lissedes(data: VenuesItem[]) {
    if (data) {
      this.sedes = data;
      this.filteredSedes = this.sedes.slice();
    }
  }

  @Input()
  set lissubcategory(data: SubcategoriaItem[]) {
    if (data) {
      this.subcategory = data;
      this.filteredSubcategory = this.subcategory.slice();
    }
  }

  @Input()
  set estatesIntern(data: EstateItem) {
    if (data) {
      this.form.patchValue(data);
      let arrayfechAlta = (this.fechAltaField.value).substring(0, 10).split('/');
      arrayfechAlta ?
        this.fechAltaField.setValue(arrayfechAlta[2] + '-' + arrayfechAlta[1] + '-' + arrayfechAlta[0]) : null;
      let arrayfechOrden = (this.fechOrdenField.value).substring(0, 10).split('/');
      arrayfechOrden ?
        this.fechOrdenField.setValue(arrayfechOrden[2] + '-' + arrayfechOrden[1] + '-' + arrayfechOrden[0]) : null;
      let arrayfechMovimiento = (this.fechMovimientoField.value).substring(0, 10).split('/');
      arrayfechMovimiento ?
        this.fechMovimientoField.setValue(arrayfechMovimiento[2] + '-' + arrayfechMovimiento[1] + '-' + arrayfechMovimiento[0]) : null;
      let arrayfechNea = (this.fechNeaField.value)?.substring(0, 10).split('/');
      arrayfechNea ?
        this.fechNeaField?.setValue(arrayfechNea[2] + '-' + arrayfechNea[1] + '-' + arrayfechNea[0]) : null;

      this.isNew = false;
      this.estate = data;
      this.mayor = this.estate.subCategoria.mayor;

    }
  }

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() showmodels = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private toastr: ToastrService,
    public datepipe: DatePipe
  ) {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.descripcion === o2.descripcion && o1.id === o2.id;
  }

  cargarmodelos() {
    let objmarca = {id: '', descripcion: ''};
    objmarca = this.marcaField.value;
    if (objmarca) {
      this.showmodels.emit(objmarca.id);
    }
  }

  cargarMayor(){
    this.mayor = this.form.value.subCategoria.mayor;
  }

  save() {
    this.hidebutoon = true;
    if (this.form.valid) {
      if (this.isNew) {
        this.create.emit(this.form.value);
      } else {
        this.update.emit(this.form.value);
      }
    } else {
      this.hidebutoon = false;
      this.form.markAllAsTouched();
    }
  }

  retornar() {
    this.router.navigate(['./admin/bienes/internos']);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      codPatrimonio: [null, Validators.required],
      descripcion: ['', Validators.required],
      fechAlta: [null],
      fechMovimiento: [null],
      fechNea: [null],
      fechOrden: [null],
      marca: [null, Validators.required],
      modelo: [null, Validators.required],
      nNea: [null],
      nOrden: [null, Validators.required],
      nSerie: [null, Validators.required],
      sede: [null],
      convenio: [null],
      administrado: [null],
      solicitud: [null],
      subCategoria: [null],
      color: [null]
    });
  }

  get idField() {
    return this.form.get('id');
  }

  get codPatrimonioField() {
    return this.form.get('codPatrimonio');
  }

  get descripcionField() {
    return this.form.get('descripcion');
  }

  get fechAltaField() {
    return this.form.get('fechAlta');
  }

  get fechMovimientoField() {
    return this.form.get('fechMovimiento');
  }

  get fechNeaField() {
    return this.form.get('fechNea');
  }

  get fechOrdenField() {
    return this.form.get('fechOrden');
  }

  get marcaField() {
    return this.form.get('marca');
  }

  get modeloField() {
    return this.form.get('modelo');
  }

  get nNeaField() {
    return this.form.get('nNea');
  }

  get nOrdenField() {
    return this.form.get('nOrden');
  }

  get nSerieField() {
    return this.form.get('nSerie');
  }

  get sedeField() {
    return this.form.get('sede');
  }

  // get convenioField() {
  //   return this.form.get('convenio');
  // }

  get administradoField() {
    return this.form.get('administrado');
  }

  
  // get solicitudField() {
  //   return this.form.get('solicitud');
  // }


}
