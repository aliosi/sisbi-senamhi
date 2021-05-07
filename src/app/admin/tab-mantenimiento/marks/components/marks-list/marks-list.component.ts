import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MarkItem} from '../../../../../core/models/mark.model';
import {MarksService} from '../../../../../core/services/marks.service';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert';
import {ExcelService} from '../../../../../core/services/excel/excel.service';
import {faFileExcel, faPlusCircle, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-marks-list',
  templateUrl: './marks-list.component.html',
  styleUrls: ['./marks-list.component.scss'],
})

export class MarksListComponent implements AfterViewInit {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nro', 'id', 'descripcion', 'fech_reg', 'estado', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: MatTableDataSource<MarkItem>;
  datos: any = {lista: '', msg: ''};
  ressol = false;
  exceldisable = false;
  faExcel = faFileExcel;
  faCircle = faPlusCircle;
  faEditar = faEdit;
  faEliminar = faTrashAlt;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private marksService: MarksService,
    private toastr: ToastrService,
    private excelService: ExcelService
  ) {
  }

  ngAfterViewInit() {
    this.exceldisable = false;
    this.fetchMarks();
  }

  fetchMarks() {
    this.marksService.getAllMarks()
      .subscribe(res => {
          this.datos = res;
          this.dataSource = new MatTableDataSource(this.datos.lista);
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
          this.marksService.deleteMark(id)
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
    console.log('entra a exportar');
    this.exceldisable = true;
    let res = this.excelService.exportToFile('Lista de Marcas', 'tablemark');
    if (res) {
      this.exceldisable = false;
    }
  }
}
