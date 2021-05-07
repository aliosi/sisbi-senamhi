import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {SubCategoryModel} from '../../../../../core/models/sub-category.model';
import {Router} from '@angular/router';
import {faArrowAltCircleLeft, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-sub-category-form',
  templateUrl: './sub-category-form.component.html',
  styleUrls: ['./sub-category-form.component.scss']
})
export class SubCategoryFormComponent implements OnInit {
  isNew = true;
  form: FormGroup;
  faArrowLeft = faArrowAltCircleLeft;
  faTimes = faTimesCircle;
  lstmayor: any[];
  filteredOptions: Observable<string[]>;
  @Input() disableId;
  @Input() disableSelect;
  @Input() hidebutoon;
  @Input() cargaform = true;

  @Input()
  set subcategorys(data: SubCategoryModel) {
    // console.log('aqui data' + data);
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }

  @Input()
  set listamayores(data: any) {
    this.buildForm();
    this.lstmayor = data;
    if (this.lstmayor) {
      this.filteredOptions = this.mayorField.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }
    // console.log('carga mayores');
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

  private _filter(value: string): string[] {
    return this.lstmayor.filter(option => option.includes(value));
  }

  save() {
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
    this.router.navigate(['./admin/subcategorias']);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [{value: null, disabled: this.disableId}, [Validators.required, Validators.pattern(/^[1-9]\d{3,}$/)]],
      descripcion: ['', Validators.required],
      mayor: [null, [Validators.required, Validators.pattern(/^[1-9]\d{2,9}$/)]],
      fech_reg: [{value: moment().format('yyyy-MM-DD hh:mm:ss'), disabled: true}, Validators.required],
      estado: ['1', Validators.required],
    });
  }


  get descripcionField() {
    return this.form.get('descripcion');
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

  get mayorField() {
    return this.form.get('mayor');
  }

}
