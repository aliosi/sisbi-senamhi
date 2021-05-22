import { Component, OnInit } from '@angular/core';
import {InventarioService} from '../../../../core/services/inventario.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-gest-report-inv',
  templateUrl: './gest-report-inv.component.html',
  styleUrls: ['./gest-report-inv.component.scss']
})
export class GestReportInvComponent implements OnInit {

  sedesList = [];
  aniosList:any;
  sedeUserList:any;

  seachForm:FormGroup;
  displayedColumns = ['AnioInv', 'CodPat', 'descBien','estadoInv','opeInv', 'UbiInv', 'RespInv'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  seeTable:any = false;
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
    this.inventarioService.getSedes()
      .subscribe(res=>{
        this.sedesList=res.listSede;
    })
  }

  getAnios(){
    this.inventarioService.getAniosInv()
      .subscribe(res=>{
        this.aniosList = res.lista;
      })
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

    this.inventarioService.getReportInv(data)
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
