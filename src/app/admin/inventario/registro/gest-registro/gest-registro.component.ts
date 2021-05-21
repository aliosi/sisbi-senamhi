import { Component, OnInit } from '@angular/core';
import {InventarioService} from '../../../../core/services/inventario.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {faFileExcel, faPlusCircle, faEdit, faTrashAlt, faAddressCard} from '@fortawesome/free-solid-svg-icons';



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
  
  constructor(
    private inventarioService: InventarioService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
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
          this.seeTable = true;  
          this.dataSource = new MatTableDataSource(res.lista);
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

  //getInvSede

}
