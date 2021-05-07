import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {EstatesService} from '../../../../../core/services/estates.service';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert';
import {ExcelService} from '../../../../../core/services/excel/excel.service';
import {faFileExcel, faPlusCircle, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EstatesExtern} from '../../../../../core/models/estate.model';

@Component({
  selector: 'app-estates-extern-list',
  templateUrl: './estates-list.component.html',
  styleUrls: ['./estates-list.component.scss']
})
export class EstatesExternListComponent implements AfterViewInit {
  displayedColumns = ['nro','id','descripcion', 'descmarca','descmodel'
    ,'n_serie','descsede','descadministrado','descconvenio','acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: MatTableDataSource<EstatesExtern>;
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
    private estatesservice: EstatesService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private excelService: ExcelService
  ) {
    // console.log('hola');
    this.fetchEstacionesExterna();

  }

  ngAfterViewInit() {
    this.exceldisable = false;

    // this.fetchMarks();
  }

  fetchEstacionesExterna() {
    this.estatesservice.getAllEstatesExter()
      .subscribe(res => {
           // console.log('externos');
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

  exportExcel() {
    // console.log('entra a exportar');
    this.exceldisable = true;
    let res = this.excelService.exportToFile('Lista de bienes externos', 'tablebnexterno');
    if (res) {
      this.exceldisable = false;
    }
  }
}
