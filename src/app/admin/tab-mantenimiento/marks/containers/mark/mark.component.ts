import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MarksService} from '../../../../../core/services/marks.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MarkItem} from '../../../../../core/models/mark.model';
import {ToastrService} from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss'],
})
export class MarkComponent implements OnInit {
  mark: MarkItem;
  disableSelect = new FormControl(false);
  datos: any = {lista: '', msg: '', error: ''};
  datosget: any = {marca: '', smg: '', error: ''};
  hidebutoon: boolean;
  listmarcas: MarkItem;
  cargaform = true;

  constructor(
    private marksService: MarksService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.getMark(params.id);
        this.disableSelect = new FormControl(false);
      } else {
        this.disableSelect = new FormControl(true);
        // this.allMarks();
      }
    });
  }


  allMarks() {
    this.marksService.getAllMarks()
      .subscribe(res => {
          this.datos = res;
          this.listmarcas = this.datos.lista;
          console.log(this.datos);
        }
      );
  }

  createMark(data) {
    this.hidebutoon = true;
    this.marksService.createMark(data)
      .subscribe(
        res => {
          this.datos = res;
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            // console.log('entraaa regis');
            this.hidebutoon = true;
            this.router.navigate(['./admin/marcas']);
            this.toastr.success(this.datos.msg);
          }
        }
      );
  }

  private getMark(id: number) {
    this.cargaform = false;
    this.marksService.getMark(id)
      .subscribe(
        res => {

          this.datosget = res;
          this.disableSelect.setValue(false);
          this.mark = this.datosget.marca;
          this.cargaform = true;
        }
      );
  }

  updateMark(data) {
    this.hidebutoon = true;
    this.marksService.updateMark(this.mark.id, data)
      .subscribe(
        res => {
          this.datos = res;
          console.log(res);
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            this.router.navigate(['./admin/marcas']);
            this.toastr.success(this.datos.msg);
            this.hidebutoon = true;
          }
        }
      );
  }

}
