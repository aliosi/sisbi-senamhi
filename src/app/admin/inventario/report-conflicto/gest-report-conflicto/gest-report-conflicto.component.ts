import { Component, OnInit } from '@angular/core';
import {InventarioService} from '../../../../core/services/inventario.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-gest-report-conflicto',
  templateUrl: './gest-report-conflicto.component.html',
  styleUrls: ['./gest-report-conflicto.component.scss']
})
export class GestReportConflictoComponent implements OnInit {

  sedesList = [];
  sedeUserList:any;

  seachForm:FormGroup;
  seeTable:any = false;
  displayedColumns = ['CodPat', 'descBien','conflicInv'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: MatTableDataSource<any>;
  constructor(
    private inventarioService: InventarioService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.getSedes();
  }

  getSedes(){
    
    if(localStorage.getItem('roles')=='23'){
      this.getSedeUser().then(()=>
          this.inventarioService.getSedes()
            .subscribe(res=>{
              for (let i = 0; i < this.sedeUserList.length; i++) {
                for (let f = 0; f < res.listSede.length; f++) {
                  if(this.sedeUserList[i].estado==res.listSede[f].id){
                    this.sedesList.push(res.listSede[f]);
                  }
                }
                
              }
          })
        );
    }else{
      this.inventarioService.getSedes()
      .subscribe(res=>{
        this.sedesList=res.listSede;
      })
    }
    
  }

  getSedeUser(){
    let promise = new Promise((resolve, reject) => {
      this.inventarioService.getSedeInv(localStorage.getItem('usuario'))
        .subscribe(res=>{
          this.sedeUserList = res.lista;
          resolve(this.sedeUserList);
        })    
    });
    return promise;      
  }

  buildForm(){
    this.seachForm = this.formBuilder.group({
      cmbSede: [null],
      txtCod: [null]
    });
  }

  searchInvSede(){
    let fsede = this.seachForm.controls['cmbSede'].value;
    let fcod = this.seachForm.controls['txtCod'].value;
    if(fsede==null){
      this.snackbar('Seleccione una sede');
      return
    }
    
    let data = {
      sede : fsede,
      cod : fcod==''?null:fcod
    }

    this.inventarioService.getReportConfi(data)
      .subscribe(res=>{
        this.seeTable = false;
        if(res.lista.length>0){
          this.seeTable = true;  
          this.dataSource = new MatTableDataSource(res.lista);
        }else{
          this.snackbar(res.msg);
        }
      })    
  }

  snackbar(msj:any){
    this._snackBar.open(msj,'',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      
    });
  }

}
