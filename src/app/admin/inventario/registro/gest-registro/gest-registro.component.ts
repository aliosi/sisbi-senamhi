import { Component, OnInit } from '@angular/core';
import {InventarioService} from '../../../../core/services/inventario.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {faFileExcel, faPlusCircle, faEdit, faTrashAlt, faAddressCard} from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog'
import {ImportarComponent} from './importar/importar.component'
import {ExcelImpComponent} from './excel-imp/excel-imp.component';


@Component({
  selector: 'app-gest-registro',
  templateUrl: './gest-registro.component.html',
  styleUrls: ['./gest-registro.component.scss']
})
export class GestRegistroComponent implements OnInit {

  sedesList = [];
  aniosList:any;
  sedeUserList:any;
  
  seeTable:any = false;
  faEditar = faEdit;
  faEliminar = faTrashAlt;
  seachForm:FormGroup;
  displayedColumns = ['codInv', 'AnioInv', 'CodPat', 'descBien','estadoInv','opeInv', 'UbiInv', 'RespInv', 'accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: MatTableDataSource<any>;
  cacheSearch:any=null;
  
  constructor(
    private inventarioService: InventarioService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog:MatDialog
  ) { 
    this.buildForm();

  }

  ngOnInit(): void {
    this.getSedes();
    this.getAnios();
  }

  getSedes(){
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
  }

  getAnios(){
    this.inventarioService.getAniosInv()
      .subscribe(res=>{
        this.aniosList = res.lista;
      })
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
      cmbAnio: [null],
      txtCod: [null]
    });
  }

  searchInvSede(){
    let fsede = this.seachForm.controls['cmbSede'].value;
    let fanio =this.seachForm.controls['cmbAnio'].value;
    let fcod = this.seachForm.controls['txtCod'].value;
    if(fsede==null){
      this.snackbar('Seleccione una sede');
      return
    }
    if(fanio==null){
      this.snackbar('Seleccione un año');
      return
    }

    let data = {
      sede : fsede,
      anio : fanio,
      cod : fcod==''?null:fcod
    }

    this.inventarioService.getInvSede(data)
      .subscribe(res=>{
        this.seeTable = false;
        if(res.lista.length>0){
          this.cacheSearch = data;
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

  openNuevo(accion:any,inve:any=null){
    let request = {
                    cabecera : accion==1?'NUEVO REGISTRO':accion==2?'EDITAR REGISTRO':'ELIMINAR REGISTRO',
                    ope : accion,
                    entity : inve
                  }
    let w = '1100px';
    let h = '470px';
    if(accion == 3){
      w = '600px';
      h = '200px';
    }

    const dialoRef = this.dialog.open(ImportarComponent,{
      width: w,
      height : h,
      data: request
    });
    dialoRef.afterClosed().subscribe(res=>{
      if(res==true){
        if(this.cacheSearch!=null){
          this.inventarioService.getInvSede(this.cacheSearch)
          .subscribe(res=>{
            this.seeTable = false;
            if(res.lista.length>0){
              this.seeTable = true;  
              this.dataSource = new MatTableDataSource(res.lista);
            }
          }) 
        }
      }
      
      }
    )
  }

  openImport(){
    const dialoRef = this.dialog.open(ExcelImpComponent,{
      width: '400px',
      height : '320px',
      data: null
    });
    dialoRef.afterClosed().subscribe(res=>{
        if(res==true){
          if(this.cacheSearch!=null){
            this.inventarioService.getInvSede(this.cacheSearch)
            .subscribe(res=>{
              this.seeTable = false;
              if(res.lista.length>0){
                this.seeTable = true;  
                this.dataSource = new MatTableDataSource(res.lista);
              }
            }) 
          }
        }
      }
    )
  }

  //getInvSede

}
