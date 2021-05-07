import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faArrowAltCircleLeft, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {MarkModelsItem} from '../../../../../../../../core/models/models';
import {MarkModelsModele} from '../../../../../../../../core/models/mark-models.model';
import {VenuesItem} from '../../../../../../../../core/models/venues.model';
import {EstateItem, EstateSolicitudItem} from '../../../../../../../../core/models/estates-intern.model';
import {SubcategoriaItem} from '../../../../../../../../core/models/sub-category.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MarkItem} from '../../../../../../../../core/models/mark.model';


@Component({
  selector: 'app-request-change-form',
  templateUrl: './request-change-form.component.html',
  styleUrls: ['./request-change-form.component.scss']
})
export class RequestChangeFormComponent implements OnInit, AfterViewInit {
  // isNewsolicitud = true;
  form: FormGroup;
  formsolicitud: FormGroup;
  faArrowLeft = faArrowAltCircleLeft;
  faTimes = faTimesCircle;
  marcas: MarkItem[] = [];
  public filteredMarcas: MarkItem[];
  modelos: MarkModelsModele[] = [];
  public filteredModelos: any;
  sedes: VenuesItem[] = [];
  public filteredSedes: any;
  subcategory: SubcategoriaItem[] = [];
  public filteredSubcategory: any;
  estate: EstateItem;
  myimage: any;
  img: { file: string };
  namefile = null;
  @Input() disableSelect;
  @Input() disableedit;
  @Input() hidebutoon;
  @Input() isNewsolicitud;
  @Input() cargaform = false;

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
      this.estate = data;
      this.form.patchValue(data);
    }
  }

  @Input()
  set datasolicitud(data: EstateSolicitudItem) {
    if (data) {
      // console.log(data);
      this.formsolicitud.patchValue(data);
      this.cargaform = true;
      this.myimage = data.img.file;
      // console.log(this.formsolicitud.value);
    }
  }

  // @Output() create = new EventEmitter();
  // @Output() update = new EventEmitter();
  @Output() showmodels = new EventEmitter();
  @Output() solicitud = new EventEmitter();
  @Output() validarsol = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.buildForm();
    this.solicitudForm();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.namefile = file.name;
      // if (file.type.match('/image.*i')) {
      //   console.log(file);
      //   if (file.size > 4200) {
      //     this.toastr.error('El tamaño máximo permitido es de 6MB');
      //   } else {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {

        this.myimage = event.target.result;
        this.imgsolicitudField.setValue({
          file: this.myimage,
          nombre: file.name,
          tipo: file.type
        });

      };
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1?.descripcion === o2?.descripcion && o1?.id === o2?.id;
  }

  cargarmodelos() {
    console.log(this.marcasolicitudField.value);
    this.showmodels.emit(this.marcasolicitudField.value.id);
  }

  save() {
    // console.log(this.isNewsolicitud);
    this.hidebutoon = true;
    if (this.formsolicitud.valid) {
      if (this.isNewsolicitud) {
        this.solicitud.emit(this.formsolicitud.value);
      } else {

        // console.log('entra a validar');
        this.estadoSolicitud.setValue('1');
        // this.imgsolicitudField.setValue('');
        // console.log(this.formsolicitud.value);
        this.validarsol.emit(this.formsolicitud.value);

      }
    } else {

      this.hidebutoon = false;
      this.form.markAllAsTouched();
    }
  }

  rechazar() {
    console.log('entra a rechazar');
    this.estadoSolicitud.setValue('0');
    console.log(this.formsolicitud.value);
    this.validarsol.emit(this.formsolicitud.value);
  }

  retornar() {
    this.router.navigate(['./admin/bienes/internos/listazonales']);
  }

  retornarsoli() {
    this.router.navigate(['./admin/bienes/internos/solicitudes']);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      codPatrimonio: [{value: null, disabled: true}, Validators.required],
      descripcion: [{value: '', disabled: true}, Validators.required],
      fechAlta: [null, Validators.required],
      fechMovimiento: [null, Validators.required],
      fechNea: [null, Validators.required],
      fechOrden: [null, Validators.required],
      marca: [{value: null, disabled: true}, Validators.required],
      modelo: [{value: null, disabled: true}, Validators.required],
      nNea: [null, Validators.required],
      nOrden: [null, Validators.required],
      nSerie: [{value: null, disabled: true}, Validators.required],
      sede: [null, Validators.required],
      convenio: [null],
      administrado: [null],
      solicitud: this.formsolicitud,
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

  private solicitudForm() {
    this.formsolicitud = this.formBuilder.group({
      comentario: [null, Validators.required],
      estado: [null],
      fechaReg: [null],
      id: [null],
      img: [null, Validators.required],
      marca: [null, Validators.required],
      modelo: [null, Validators.required],
      nSerie: [null, Validators.required],
      tel: [null],
      user: [null]
    });
  }

  get comentariosolicitudField() {
    return this.formsolicitud.get('comentario');
  }

  get imgsolicitudField() {
    return this.formsolicitud.get('img');
  }

  get marcasolicitudField() {
    return this.formsolicitud.get('marca');
  }

  get modelosolicitudField() {
    return this.formsolicitud.get('modelo');
  }

  get nSeriesolicitudField() {
    return this.formsolicitud.get('nSerie');
  }

  get estadoSolicitud() {
    return this.formsolicitud.get('estado');
  }

}
