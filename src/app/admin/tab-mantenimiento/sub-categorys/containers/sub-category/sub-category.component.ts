import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SubcategoryService} from '../../../../../core/services/subcategory.service';
import {SubcategoriaItem, SubCategoryModel} from '../../../../../core/models/sub-category.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  subcategorys: SubcategoriaItem;
  disableSelect = new FormControl(false);
  datos: SubCategoryModel;
  datosmayor: any = {lista: '', msg: '', error: ''};
  listamayores: any;
  datosget: any = {subCate: '', msg: '', error: ''};
  hidebutoon: boolean;
  disableId: boolean;
  cargaform=true;

  constructor(
    private subcategoryService: SubcategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getAllMayor();
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        console.log('listo a modificar');
        this.getSubcategory(params.id);
        this.disableId = true;
        this.disableSelect = new FormControl(false);
      } else {
        this.disableId = false;
        this.disableSelect = new FormControl(true);
      }
    });
    // console.log(this.disableId.value+'estado');
  }

  // pageEvent(){
  //   console.log('hola');
  // }
  createSubcategorys(data) {
    this.hidebutoon = true;
    this.subcategoryService.createSubcategory(data)
      .subscribe(
        res => {
          this.datos = res;
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            // console.log('entraaa regis');
            this.hidebutoon = true;
            this.router.navigate(['./admin/subcategorias']);
            this.toastr.success(this.datos.msg);
          }
        }
      );
  }

  private getSubcategory(id: number) {
    this.cargaform = false;
    this.subcategoryService.getSubcategory(id)
      .subscribe(
        res => {
          this.datosget = res;
          this.disableSelect.setValue(false);
          this.subcategorys = this.datosget.subCate;
          this.cargaform = true;
        }
      );
  }

  getAllMayor() {
    this.subcategoryService.getAllMayor()
      .subscribe(
        res => {
          this.datosmayor = res;
          this.listamayores = this.datosmayor.lista;
        }
      );
  }

  updateSubcategorys(data) {
    this.hidebutoon = true;
    this.subcategoryService.updateSubcategory(this.subcategorys.id, data)
      .subscribe(
        res => {
          this.datos = res;
          // console.log(res);
          if (res.error) {
            this.toastr.error(this.datos.error);
            this.hidebutoon = false;
          } else {
            this.router.navigate(['./admin/subcategorias']);
            this.toastr.success(this.datos.msg);
            this.hidebutoon = true;
          }
        }
      );
  }

}
