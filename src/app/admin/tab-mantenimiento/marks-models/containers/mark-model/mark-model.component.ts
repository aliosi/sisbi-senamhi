import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MarksService} from '../../../../../core/services/marks.service';
import {ToastrService} from 'ngx-toastr';
import {MarkModelsService} from '../../../../../core/services/marks-models.service';
import {MarkItem} from '../../../../../core/models/mark.model';


@Component({
  selector: 'app-mark-model',
  templateUrl: './mark-model.component.html',
  styleUrls: ['./mark-model.component.scss']
})
export class MarkModelComponent implements OnInit {
  markmodel: any;
  disableSelect = new FormControl(false);
  datos: any = {lista: '', msg: '', error: ''};
  datosmarcas: any = {lista: '', msg: '', error: ''};
  listamarcas: MarkItem;
  datosget: any = {modelo: '', msg: '', error: ''};
  hidebutoon: boolean;
  disableId: boolean;
  cargaform=true;

  constructor(
    private modelsService: MarkModelsService,
    private markService: MarksService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {


  }

  ngOnInit(): void {
    this.getAllMarks();

  }


  createModels(data) {
    this.hidebutoon = true;
    this.modelsService.createMarkModels(data)
      .subscribe(
        res => {
          this.datos = res;
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            // console.log('entraaa regis');
            this.hidebutoon = true;
            this.router.navigate(['./admin/modelos']);
            this.toastr.success(this.datos.msg);
          }
        }
      );
  }

  private getModels(id: number) {
    this.cargaform=false;
    this.modelsService.getMarkModels(id)
      .subscribe(
        res => {
          this.datosget = res;
          this.disableSelect.setValue(false);
          this.markmodel = this.datosget.modelo;
          this.cargaform=true;
        }
      );
  }


  getAllMarks() {
    this.markService.getAllMarks()
      .subscribe(
        res => {
          this.datosmarcas = res;
          this.listamarcas = this.datosmarcas.lista;
          this.route.params.subscribe((params: Params) => {
            if (params.id) {
              this.getModels(params.id);
              this.disableSelect = new FormControl(false);
            } else {
              this.disableSelect = new FormControl(true);
            }
          });

        }
      );
  }

  updateModels(data) {
    this.hidebutoon = true;
    this.modelsService.updateMarkModels(this.markmodel.id, data)
      .subscribe(
        res => {
          this.datos = res;
          // console.log(res);
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            this.router.navigate(['./admin/modelos']);
            this.toastr.success(this.datos.msg);
            this.hidebutoon = true;
          }
        }
      );
  }
}
