import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatPaginator,PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SubcategoryService} from '../../../../../core/services/subcategory.service';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert';
import {ExcelService} from '../../../../../core/services/excel/excel.service';
import {faFileExcel, faPlusCircle, faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {MarkItem} from '../../../../../core/models/mark.model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements AfterViewInit {
  displayedColumns = ['nro', 'id', 'descripcion', 'mayor', 'fech_reg', 'estado', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: MatTableDataSource<MarkItem>;
  datos: any = {lista: '', msg: '', error: ''};
  ressol = false;
  exceldisable = false;
  faExcel = faFileExcel;
  faCircle = faPlusCircle;
  faEditar = faEdit;
  faEliminar = faTrashAlt;
  pageSize = 10;
  // MatPaginator Output
  pageEvent: PageEvent;

  // pageIndex = new Observable<any>(observer => {
  //   setInterval((
  //
  //
  //   ) => observer.next(
  //
  //     this.paginator.pageIndex
  //   ), 0);
  //
  // });
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private subcategoryService: SubcategoryService,
    private toastr: ToastrService,
    private excelService: ExcelService,
    private router: Router
  ) {



    // if (this.pageEvent){
    //   console.log('nuevo evento');
    //   console.log(this.pageEvent.pageIndex);
    //
    // }
  }

  ngAfterViewInit() {
    this.exceldisable = false;
    this.fetchSubcategory(null, this.pageSize);

  }

  logNameChange() {

    // this.pageEvent.pageIndex.valueChanges.forEach(
    //   (value: string) => this.nameChangeLog.push(value)
    // );
  }

  fetchSubcategory(index, size) {
    // this.pageIndex.subscribe(res=>{
    //   console.log(res);
    // })
    // console.log(size);
    this.subcategoryService.getAllSubcategory()
      .subscribe(res => {
          this.datos = res;
          this.dataSource = new MatTableDataSource(this.datos.lista);
          this.dataSource.paginator = this.paginator;
          // console.log('....');
          console.log(this.dataSource.paginator);
          // console.log(this.dataSource.paginator.pageIndex = 2);
          // console.log('....');
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
          this.subcategoryService.deleteSubcategory(id)
            .subscribe(res => {
              this.datos = res;
              if (this.datos.msg) {
                this.toastr.success(this.datos.msg);
                this.dataSource = new MatTableDataSource(this.datos.lista);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.ressol = false;
              } else if (this.datos.error) {
                this.toastr.error('Esta fila no puede ser eliminada debido a que otro formulario esta haciendo uso de esta');
                this.ressol = false;
              }

            });
        }
      });
  }

  exportExcel() {
    this.exceldisable = true;
    let res = this.excelService.exportToFile('Lista de Subcategorias', 'tablesubcategory');
    if (res) {
      this.exceldisable = false;
    }
  }
}
