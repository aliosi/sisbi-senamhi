import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {EstatesService} from '../../../../../core/services/estates.service';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert';
import {ExcelService} from '../../../../../core/services/excel/excel.service';
import {faFileExcel, faPlusCircle, faEdit, faTrashAlt, faCreditCard} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EstateInternModel} from '../../../../../core/models/estate.model';


@Component({
  selector: 'app-estates-zonales-list',
  templateUrl: './estates-zonales-list.component.html',
  styleUrls: ['./estates-zonales-list.component.scss']
})
export class EstatesZonalesListComponent implements AfterViewInit {
  /* displayedColumns = ['nro', 'sede', 'marca', 'modelo', 'codpatrimonio', 'descripcion', 'nSerie', 'estado', 'acciones']; */
  displayedColumns = ['codpatrimonio','descripcion','marca', 'modelo','sede', 'nSerie', 'estado', 'acciones'];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: MatTableDataSource<EstateInternModel>;
  datos: any = [];
  ressol = false;
  exceldisable = false;
  faExcel = faFileExcel;
  faCircle = faPlusCircle;
  faEditar = faEdit;
  faEliminar = faTrashAlt;
  faCreditCard = faCreditCard;
  rol: any;
  user: any;
  cargaform = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private estatesservice: EstatesService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private excelService: ExcelService
  ) {
    this.rol = localStorage.getItem('roles');
    this.user = localStorage.getItem('usuario');
    this.fetchEstacionesInternasZonal(this.user);
  }

  ngAfterViewInit() {
    this.exceldisable = false;
  }

  fetchEstacionesInternasZonal(user) {
    this.cargaform = true;
    this.estatesservice.getSolicitudesUsuario(user)
      .subscribe(res => {
          // this.datos = res.lista;
          res.lista.forEach((data, index) => {
            this.datos.push(
              {
                id: data.id,
                codPatrimonio: data.codPatrimonio,
                descripcion: data.descripcion,
                marca: data.marca,
                descmarca: data.marca?.descripcion,
                modelo: data.modelo,
                descmodelo: data.modelo?.descripcion,
                nSerie: data.nSerie,
                nOrden: data.nOrden,
                fechOrden: data.fechOrden,
                nNea: data.nNea,
                fechNea: data.fechNea,
                subCategoria: data.subCategoria,
                descSubcategoria: data.subCategoria?.descripcion,
                sede: data.sede,
                descsede: data.sede?.descripcion,
                fechMovimiento: data.fechMovimiento,
                fechAlta: data.fechAlta,
                solicitud: data.solicitud,
                idSolicitud: data.solicitud?.id,
                marcaSolicitud: data.solicitud?.marca,
                modeloSolicitud: data.solicitud?.modelo,
                nSerieSolicitud: data.solicitud?.nSerie,
                userSolicitud: data.solicitud?.user,
                telSolicitud: data.solicitud?.tel,
                imgSolicitud: data.solicitud?.img,
                estadoSolicitud: data.solicitud?.estado,
                fech_regSolicitud: data.solicitud?.fechaReg
              }
            );
          });
          // console.log(this.datos);
          this.dataSource = new MatTableDataSource(this.datos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.ressol = false;
          this.cargaform = false;
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

  // solicitud(id){
  //   this.router.navigate(['./admin/bienes/internos/solicitud']);
  // }

  exportExcel() {
    // console.log('entra a exportar');
    this.exceldisable = true;
    let res = this.excelService.exportToFile('Lista de bienes internos', 'tableinternos');

    if (res) {
      this.exceldisable = false;
    }
  }
}
