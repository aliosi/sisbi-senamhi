import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {MarkItem} from '../../../../../core/models/mark.model';
import {Router} from '@angular/router';
import {faArrowAltCircleLeft, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-marks-form',
  templateUrl: './marks-form.component.html',
  styleUrls: ['./marks-form.component.scss']
})
export class MarksFormComponent implements OnInit {
  isNew = true;
  form: FormGroup;
  faArrowLeft = faArrowAltCircleLeft;
  faTimes = faTimesCircle;
  @Input() disableSelect;
  @Input() hidebutoon;

  @Input()
  set mark(data: MarkItem) {
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  @Input() cargaform;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    // console.log(this.mark);
  }

  save() {
    // this.hidebutoon = true;
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
    this.router.navigate(['./admin/marcas']);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      descripcion: ['', Validators.required],
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


}
