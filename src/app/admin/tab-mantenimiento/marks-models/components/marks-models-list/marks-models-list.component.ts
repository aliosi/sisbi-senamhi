import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert';
import {ExcelService} from '../../../../../core/services/excel/excel.service';
import {faFileExcel, faPlusCircle, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {MarkModelsService} from '../../../../../core/services/marks-models.service';
import {MarkModelsModel} from '../../../../../core/models/mark-models.model';

@Component({
  selector: 'app-marks-models-list',
  templateUrl: './marks-models-list.component.html',
  styleUrls: ['./marks-models-list.component.scss']
})
export class MarksModelsListComponent implements AfterViewInit {
  displayedColumns = ['nro','id', 'descripcion', 'marca', 'fech_reg', 'estado', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: MatTableDataSource<MarkModelsModel>;
  datos: any;
  ressol = false;
  exceldisable = false;
  faExcel = faFileExcel;
  faCircle = faPlusCircle;
  faEditar = faEdit;
  faEliminar = faTrashAlt;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private modelService: MarkModelsService,
    private toastr: ToastrService,
    private excelService: ExcelService
  ) {
  }

  ngAfterViewInit() {
    this.fetchModels();
  }

  fetchModels() {
    this.modelService.getAllMarkModels()
      .subscribe(res => {
          this.datos = res.lista;
          this.dataSource = new MatTableDataSource(this.datos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.ressol = false;
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number) {
    swal({
      title: 'Estas seguro de realizar esta acción?',
      text: 'Alerta! estos datos no podrán ser recuperados',
      icon: 'warning',
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.ressol = true;
          this.modelService.deleteMarkModels(id)
            .subscribe(res => {
              this.datos = res;
              if (this.datos.msg) {
                this.toastr.success(this.datos.msg);
                this.dataSource = new MatTableDataSource(this.datos.lista);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              } else {
                this.toastr.error('Esta fila no puede ser eliminada debido a que otro formulario esta haciendo uso de esta');
              }
              this.ressol = false;
            });
        }
      });
  }

  exportExcel() {
    this.exceldisable = true;
    let res = this.excelService.exportToFile('Lista de Modelos', 'tablemodels');
    if (res) {
      this.exceldisable = false;
    }
  }


}
