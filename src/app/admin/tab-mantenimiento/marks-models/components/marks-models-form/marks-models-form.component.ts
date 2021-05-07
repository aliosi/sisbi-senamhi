import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {MarkModelsModel} from '../../../../../core/models/mark-models.model';
import {Router} from '@angular/router';
import {faArrowAltCircleLeft, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {map, startWith} from 'rxjs/operators';
import {MarkItem} from '../../../../../core/models/mark.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-marks-models-form',
  templateUrl: './marks-models-form.component.html',
  styleUrls: ['./marks-models-form.component.scss']
})
export class MarksModelsFormComponent implements OnInit {
  isNew = true;
  form: FormGroup;
  faArrowLeft = faArrowAltCircleLeft;
  faTimes = faTimesCircle;
  lstmarcas: MarkItem[];
  markGroupOptions: Observable<MarkItem[]>;
  @Input() disableId;
  @Input() disableSelect;
  @Input() hidebutoon;
  @Input() cargaform;
  markForm: MarkItem;

  @Input()
  set listamarcas(data: MarkItem[]) {
    this.buildForm();
    if (data) {
      this.lstmarcas = data;
      this.buildForm();
      this.markGroupOptions = this.marcaField.valueChanges
        .pipe(
          startWith(''),
          map(marca => marca ? this._filter(marca) : this.lstmarcas)
        );
    }
  }

  @Input()
  set markmodel(data: MarkModelsModel) {
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

  }

  displayMarca(subject) {
    return subject ? subject.descripcion : undefined;
  }


  private _filter(value: string): MarkItem[] {
    const filterValue = value;
    return this.lstmarcas.filter(lis => lis.descripcion.indexOf(filterValue) === 0);
  }


  save() {
    if (this.form.valid) {
      var datos = {};
      if (this.marcaField.value.length) {
        datos = this.acm();
      } else {
        datos = this.form.value;
      }
      if (this.isNew) {
        this.create.emit(datos);
      } else {
        this.update.emit(datos);
      }
    } else {
      this.hidebutoon = false;
      this.form.markAllAsTouched();
    }
  }

  acm() {
    let marcas: MarkItem = {
      id: null,
      descripcion: this.marcaField.value,
      estado: null,
      fech_reg: null
    };
    this.markForm = marcas;
    return {
      id: this.idField.value,
      descripcion: this.descripcionField.value,
      fech_reg: null,
      marca: this.markForm,
      estado: null
    };
  }

  retornar() {
    this.router.navigate(['./admin/modelos']);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      descripcion: ['', Validators.required],
      marca: [null],
      fech_reg: [{value: moment().format('yyyy-MM-DD hh:mm:ss'), disabled: true}, Validators.required],
      estado: ['1', Validators.required],
    });
  }

  get fech_regField() {
    return this.form.get('fechreg');
  }

  get estadoField() {
    return this.form.get('estado');
  }

  get idField() {
    return this.form.get('id');
  }

  get descripcionField() {
    return this.form.get('descripcion');
  }

  get marcaField() {
    return this.form.get('marca');
  }


}
