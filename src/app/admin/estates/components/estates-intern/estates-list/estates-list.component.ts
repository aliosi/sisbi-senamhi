import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {EstatesService} from '../../../../../core/services/estates.service';
import {ToastrService} from 'ngx-toastr';
import {ExcelService} from '../../../../../core/services/excel/excel.service';
import {faFileExcel, faPlusCircle, faEdit, faTrashAlt, faCreditCard,faSync} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {EstateInternModel} from '../../../../../core/models/estate.model';
import {VenuesService} from '../../../../../core/services/venues.service';
import {VenuesItem} from '../../../../../core/models/venues.model';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-estates-list',
  templateUrl: './estates-list.component.html',
  styleUrls: ['./estates-list.component.scss']
})
export class EstatesListComponent implements AfterViewInit {
  /* displayedColumns = ['nro', 'id', 'codpatrimonio', 'descripcion', 'fechAlta', 'fechMovimiento', 'fechNea', 'fechOrden'
    , 'descmarca', 'descmodelo', 'nNea', 'nOrden', 'nSerie', 'descsede', 'descSubcategoria','color', 'acciones']; */
    displayedColumns = ['codpatrimonio', 'descripcion', 'descmarca', 'descmodelo', 'nSerie', 'descsede','acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: MatTableDataSource<EstateInternModel>;
  datos: any;
  ressol = false;
  exceldisable = false;
  faExcel = faFileExcel;
  faCircle = faPlusCircle;
  faEditar = faEdit;
  faEliminar = faTrashAlt;
  faCreditCard = faCreditCard;
  faSync=faSync;
  cargaform = false;
  rol: any;
  user: any;
  sede: any;
  sedes: VenuesItem[] = [];
  selectsede: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private estatesservice: EstatesService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private excelService: ExcelService,
    private venuesService: VenuesService,
  ) {
    this.rol = localStorage.getItem('roles');
    // this.getAllVenues();
  }

  ngAfterViewInit() {
    this.sede = {};
    this.exceldisable = false;
    this.route.queryParams
      .subscribe(params => {
          console.log('entra a parámetros');
          // console.log(params);
          this.selectsede = {id: params.id, descripcion: params.descripcion};
          // console.log(this.selectsede);
        // this.fetchEstacionesInternas( this.selectsede);
        }
      );
    this.getAllVenues();
  }

  selectionsede(e) {
    this.router.navigate(['./admin/bienes/internos'], {queryParams: e});
    this.fetchEstacionesInternas(e);
  }

  fetchEstacionesInternas(e) {
    // console.log('entra a listar' + e);
    this.cargaform = true;
    this.estatesservice.getAllEstatesInterZonal(e.id)
      .subscribe(res => {
          this.datos = res.lista;

          this.dataSource = new MatTableDataSource(this.datos);
          // console.log(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.ressol = false;
          this.cargaform = false;
        }
      );
  }

  private getAllVenues() {
    // console.log('entra');
    this.cargaform = true;
    this.venuesService.getAllVenues()
      .subscribe(
        res => {
          this.sedes = res.listSede;
          this.sede = this.selectsede;
          // console.log(this.sede);
          if (!this.sede.id) {
            console.log('entra?');
            this.sede = this.sedes[0];
          }
          // console.log(this.sede);
          this.fetchEstacionesInternas(this.sede);

        }
      );
  }

  compareObjects(o1: any, o2: any): boolean {
    // console.log('entra a buscar');
    return o1.descripcion === o2.descripcion && o1.id === o2.id;
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
    let res = this.excelService.exportExcel(this.datos, 'LISTADO DE BIENES INTERNOS - ' + this.sede.descripcion);
    if (res) {
      this.exceldisable = false;
    }
  }
}
