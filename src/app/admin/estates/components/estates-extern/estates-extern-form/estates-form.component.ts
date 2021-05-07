import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {FormBuilder, FormControl , FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {faArrowAltCircleLeft, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {EstateItem, EstatesExternItem } from '../../../../../core/models/estates-intern.model';
import {MarkItem} from '../../../../../core/models/mark.model';
import {MarkModelsModele} from '../../../../../core/models/mark-models.model';
import {VenuesItem} from '../../../../../core/models/venues.model';

@Component({
  selector: 'app-estates-extern-form',
  templateUrl: './estates-form.component.html',
  styleUrls: ['./estates-form.component.scss']
})
export class EstatesExternFormComponent implements AfterViewInit {
  isNew = true;
  form: FormGroup;
  faArrowLeft = faArrowAltCircleLeft;
  faTimes = faTimesCircle;
  marcas: MarkItem[] = [];
  public filteredMarcas: any;
  modelos: MarkModelsModele[] = [];
  public filteredModelos: any;
  sedes: VenuesItem[] = [];
  public filteredSedes: any;
  estate: EstateItem;
  public administrado = [

    // {
    //   'descripcion': 'OEFA',
    //   'id': '10'
    // },
    // {
    //   'descripcion': 'OEFA',
    //   'id': '11'
    // },
  ];
  public filteredAdministrado = this.administrado.slice();
  public convenio = [
    // {
    //   'descripcion': 'CONVENIO OEFA - SENAMHI',
    //   'id': '1'
    // },
    // {
    //   'descripcion': 'CONVENIO OEFA - SENAMHI',
    //   'id': '2'
    // }
  ];
  public filteredConvenio = this.convenio.slice();

  @Input() disableSelect;
  @Input() hidebutoon;
  @Input() formactive;

  @Input()
  set listmarcas(data: MarkItem[]) {
    if (data) {

      // console.log('hola aqui marcas');
      // console.log(data);
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
      // console.log('aqui sedes');
      // console.log(this.sedes);
      // console.log('end-sedes');
      this.filteredSedes = this.sedes.slice();
    }
  }

  @Input()
  set estatesExtern(data: EstateItem) {
    if (data) {
      // console.log('estates');
      // console.log(data);
      this.isNew = false;
      this.estate = data;
      this.form.patchValue(data);
    }
  }

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() showmodels = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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

  save() {
    this.hidebutoon = true;
    if (this.form.valid) {
      if (this.isNew) {
        this.create.emit(this.form.value);
      } else {
        // console.log(this.form.value);
        this.update.emit(this.form.value);
      }
    } else {
      this.hidebutoon = false;
      this.form.markAllAsTouched();
    }
  }

  retornar() {
    this.router.navigate(['./admin/bienes/externos']);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      codPatrimonio: [null],
      descripcion: ['', Validators.required],
      fechAlta: [null],
      fechMovimiento: [null],
      fechNea: [null],
      fechOrden: [null],
      marca: [null, Validators.required],
      modelo: [null, Validators.required],
      nNea: [null],
      nOrden: [null],
      nSerie: [null, Validators.required],
      sede: [null, Validators.required],
      convenio: [null],
      administrado: [null],
      solicitud: [null],
      subCategoria: [null],
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
    return this.form.get('fechAlta');
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

  get convenioField() {
    return this.form.get('convenio');
  }

  get administradoField() {
    return this.form.get('administrado');
  }

  get solicitudField() {
    return this.form.get('solicitud');
  }

  get subCategoriaField() {
    return this.form.get('subCategoria');
  }


}
