import {Component, OnInit} from '@angular/core';
import {ExcelService} from '../../../../../core/services/excel/excel.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VenuesService} from '../../../../../core/services/venues.service';
import {VenuesItem} from '../../../../../core/models/venues.model';
import {EstatesService} from '../../../../../core/services/estates.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-estates-import-form',
  templateUrl: './estates-import-form.component.html',
  styleUrls: ['./estates-import-form.component.scss']
})
export class EstatesImportFormComponent implements OnInit {
  data: any;
  formobj: FormGroup;
  formmarca: FormGroup;
  formmodelo: FormGroup;
  formsede: FormGroup;
  formsubCategoria: FormGroup;
  lista: any[] = [];
  hidebutoon = new FormControl(false);
  datos: any = {lista: '', msg: '', error: ''};
  sedes: VenuesItem[] = [];
  public filteredSedes: any;
  formulario: FormGroup;
  namefile = null;


  constructor(
    private formBuilder: FormBuilder,
    public excelservice: ExcelService,
    private venuesService: VenuesService,
    private estateservice: EstatesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.formmarcas();
    this.formmodelos();
    this.formsedes();
    this.subCategorias();
    this.formobjs();
    this.formulatio();
    this.getAllVenues();
  }

  ngOnInit(): void {

  }

  private getAllVenues() {
    this.venuesService.getAllVenues()
      .subscribe(
        res => {
          this.sedes = res.listSede;
          this.filteredSedes = this.sedes.slice();
        }
      );
  }

  compareObjects(o1: any, o2: any): boolean {
    // console.log('entra a buscar');
    return o1.descripcion.lowerCase() === o2.descripcion.lowerCase() && o1.id === o2.id;
  }

  onFileChange(evt: any) {
    this.hidebutoon = new FormControl(true);
    this.data = [];
    /* wire up file reader */
    this.namefile = evt.target.files[0].name;
    const target: DataTransfer = <DataTransfer> (evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      this.data = this.excelservice.importFromFile(bstr);
      console.log(this.data);
      if (this.data) {
        this.hidebutoon = new FormControl(false);
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  grabar() {
    // console.log(this.hidebutoon);
    this.hidebutoon = new FormControl(true);
    setTimeout(() => {
      if (this.hidebutoon) {
        console.log(this.hidebutoon);
        // let contador = 0;
        if (this.formulario.invalid) {
          this.formulario.markAllAsTouched();
          this.hidebutoon = new FormControl(false);
        } else {
          console.log(this.hidebutoon);
          let log_pedazos = 1000;
          let arreglo = [];
          console.log(this.data);
          for (let i = 0; i < this.data.length; i++) {
            // let pedazo = this.datos.slice(i, i + log_pedazos);
            // arreglo.push(pedazo);
            const element = this.data[i];
            if (i >= 1) {
              this.descripcionformmarcas.setValue(element[3] ? element[3].toString() : null);
              this.descripcionformmodelos.setValue(element[4] ? element[4].toString() : null);
              this.descripcionsubCategoriaField.setValue(element[6] ? element[6].toString() : null);
              this.idsubCategoriaField.setValue(element[8] ? element[8].toString() : null);
              this.mayorsubCategoriaField.setValue(element[7] ? element[7].toString() : null);
              this.codPatrimonioformobjs.setValue(element[0] ? element[0].toString() : null);
              this.descripcionformobjs.setValue(element[1] ? element[1].toString() : null);
              this.fechAltaformobjs.setValue(element[13] ? element[13].toString() : null);
              this.fechMovimientoformobjs.setValue(element[12] ? element[12].toString() : null);
              this.fechOrdenformobjs.setValue(element[2] ? element[2].toString() : null);
              this.fechNeaformobjs.setValue(element[10] ? element[10].toString() : null);
              this.nOrdenformobjs.setValue(element[5] ? element[5].toString() : null);
              this.nNeaformobjs.setValue(element[9] ? element[9].toString() : null);
              this.nSerieformobjs.setValue(element[14] ? element[14].toString() : null);
              this.colorformobjs.setValue(element[15] ? element[15].toString() : null);
              // console.log(element[14].toString());
              // break;
              this.lista.push(this.formobj.value);
            }
          }
          // console.log(this.lista);
          for (let i = 0; i < this.lista.length; i += log_pedazos) {
            let pedazo = this.lista.slice(i, i + log_pedazos);
            arreglo.push(pedazo);
            // console.log(pedazo);
            this.salvar(pedazo);
            // console.log(pedazo);
          }
          // console.log(this.sedeformobjs.value);
          this.router.navigate(['./admin/bienes/internos'], {queryParams: this.sedeformobjs.value});
          this.toastr.success('Se registro correctamente');

          // console.log(arreglo);
          // console.log(this.lista.slice(0,10));
          // console.log('arreglo', arreglo);
          // this.salvar(this.lista);
        }
      }
    }, 500);


  }

  salvar(data) {
    // this.hidebutoon = true;
    this.estateservice.createEstatesImport(data).subscribe(
      res => {
        // console.log(res);
        // this.datos = res;
        if (res.error) {
          this.toastr.error(this.datos.error);
          // this.hidebutoon = false;
        } else {
          // this.hidebutoon = false;
        }
      }
    );
  }


  private formobjs() {
    this.formobj = this.formBuilder.group({
      codPatrimonio: null,
      descripcion: null,
      fechAlta: null,
      fechMovimiento: null,
      fechOrden: null,
      fechNea: null,
      marca: this.formmarca,
      modelo: this.formmodelo,
      nOrden: null,
      nNea: null,
      nSerie: null,
      sede: null,
      // sede: [null, Validators.required],
      subCategoria: this.formsubCategoria,
      nombrecolor: null,
    });
  }

  get codPatrimonioformobjs() {
    return this.formobj.get('codPatrimonio');
  }

  get descripcionformobjs() {
    return this.formobj.get('descripcion');
  }

  get fechAltaformobjs() {
    return this.formobj.get('fechAlta');
  }

  get fechMovimientoformobjs() {
    return this.formobj.get('fechMovimiento');
  }

  get fechOrdenformobjs() {
    return this.formobj.get('fechOrden');
  }

  get fechNeaformobjs() {
    return this.formobj.get('fechNea');
  }

  get nOrdenformobjs() {
    return this.formobj.get('nOrden');
  }

  get nNeaformobjs() {
    return this.formobj.get('nNea');
  }

  get nSerieformobjs() {
    return this.formobj.get('nSerie');
  }

  get sedeformobjs() {
    return this.formobj.get('sede');
  }

  get colorformobjs() {
    return this.formobj.get('nombrecolor');
  }

//Marcas
  private formmarcas() {
    this.formmarca = this.formBuilder.group({
      descripcion: null
    });
  }

  get descripcionformmarcas() {
    return this.formmarca.get('descripcion');
  }

// Modelos
  private formmodelos() {
    this.formmodelo = this.formBuilder.group({
      descripcion: null
    });
  }

  get descripcionformmodelos() {
    return this.formmodelo.get('descripcion');
  }

// Sedes
  private formsedes() {
    this.formsede = this.formBuilder.group({
      descripcion: [null, Validators.required],
      id: null
    });
  }

  // get idformsedes() {
  //   return this.formsede.get('id');
  // }

  get descripcionformsedes() {
    return this.formsede.get('descripcion');
  }

  // subCategorias
  private subCategorias() {
    this.formsubCategoria = this.formBuilder.group({
      descripcion: null,
      id: null,
      mayor: null
    });
  }

  get idsubCategoriaField() {
    return this.formsubCategoria.get('id');
  }

  get descripcionsubCategoriaField() {
    return this.formsubCategoria.get('descripcion');
  }

  get mayorsubCategoriaField() {
    return this.formsubCategoria.get('mayor');
  }

  //
  private formulatio() {
    this.formulario = this.formBuilder.group(
      {
        inputfile: [null, Validators.required],
        sede: this.formobj
      }
    );
  }

  get inputfileformulatio() {
    return this.formulario.get('inputfile');
  }


  //   data.lista.forEach((data, index) => {
  //     this.lista.push(
  // }


}
