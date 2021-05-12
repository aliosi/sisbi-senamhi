import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {EstatesService} from '../../../../../../../../core/services/estates.service';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert';
import {ExcelExportService} from '@syncfusion/ej2-angular-treegrid';
import {faFileExcel, faPlusCircle, faEdit, faTrashAlt, faAddressCard} from '@fortawesome/free-solid-svg-icons';
import {ExcelService} from '../../../../../../../../core/services/excel/excel.service';
import {EstateSolicitudItem} from '../../../../../../../../core/models/estates-intern.model';

@Component({
  selector: 'app-request-change-list',
  templateUrl: './request-change-list.component.html',
  styleUrls: ['./request-change-list.component.scss']
})
export class RequestChangeListComponent implements AfterViewInit {

  /* displayedColumns = ['nro','idSolicitud', 'fech_regSolicitud', 'codPatrimonio', 'descripcion', 'nSerie', 'descsede', 'acciones']; */
  displayedColumns = ['fech_regSolicitud', 'codPatrimonio', 'descripcion', 'descsede','userSolicitud','telSolicitud', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: MatTableDataSource<EstateSolicitudItem>;
  datos: any = {lista: '', msg: ''};
  ressol = false;
  exceldisable = false;
  faExcel = faFileExcel;
  faCircle = faPlusCircle;
  faEditar = faEdit;
  faEliminar = faTrashAlt;
  faAdres = faAddressCard;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private estatesService: EstatesService,
    private toastr: ToastrService,
    private excelService: ExcelService
  ) {
  }

  ngAfterViewInit() {
    this.exceldisable = false;
    this.fetchMarks();
  }

  fetchMarks() {
    this.estatesService.getAllSolicitudes()
      .subscribe(res => {
          this.datos = res;
          /* console.log(this.datos); */
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

  exportExcel() {
    // console.log('entra a exportar');
    this.exceldisable = true;
    let res = this.excelService.exportToFile('Lista de solicitudes de cambio', 'tablemark');
    if (res) {
      this.exceldisable = false;
    }
  }

}
