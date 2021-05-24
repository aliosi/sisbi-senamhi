import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {FormBuilder, FormGroup} from '@angular/forms';
import {InventarioService} from '../../../../../core/services/inventario.service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.scss']
})
export class ImportarComponent implements OnInit {
  sedesList = [];
  formGest:FormGroup;
  sedeUserList:any;
  opeList = [
             {nombre: 'SI'},
             {nombre: 'NO'}
            ];
  estaList:any;
  seeForm=true;
  constructor(
    public dialogRef: MatDialogRef<ImportarComponent>,
    @Inject(MAT_DIALOG_DATA) public body:any,
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargaInit().then(()=>
      this.formGest
    );
  }

  cargaInit(){
    let promise = new Promise((resolve, reject) => {
      this.getSedes();
      this.getEstadoInv();
      this.buildForm();
      if(this.body.ope == 3){
        this.seeForm = false;
      }else{
        if(this.body.entity != null){
          this.formGest.controls['cmbSede'].setValue(this.body.entity.sede.codigo);
          this.formGest.controls['txtCod'].setValue(this.body.entity.bien.codPatrimonio);
          this.formGest.controls['txtDesc'].setValue(this.body.entity.bien.descripcion);
          this.formGest.controls['cmbEstado'].setValue(this.body.entity.estAbre);
          this.formGest.controls['cmbOpe'].setValue(this.body.entity.operativo);
          this.formGest.controls['txtUbi'].setValue(this.body.entity.ubi);
          this.formGest.controls['txtDni'].setValue(this.body.entity.dni);
          this.formGest.controls['txtResp'].setValue(this.body.entity.nombre);
          this.formGest.controls['txtObs'].setValue(this.body.entity.obs);
        }
      }
      resolve(this.formGest);
    });
    return promise;
  }

  buildForm(){
    this.formGest = this.formBuilder.group({
      cmbSede: [null],
      txtCod: [null],
      txtDesc: [null],
      cmbEstado: [null],
      cmbOpe: [null],
      txtUbi: [null],
      txtDni: [null],
      txtResp: [null],
      txtObs: [null]
    });
    this.formGest.controls['txtDesc'].disable();
    this.formGest.controls['txtResp'].disable();
    if(this.body.ope == 2){
      this.formGest.controls['txtCod'].disable();
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

  getEstadoInv(){
    this.inventarioService.getEstadoInv()
        .subscribe(res=>{
        this.estaList = res.lista;
      })
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  onClick(){
    let sede = this.formGest.controls['cmbSede'].value;
    let codPa = this.formGest.controls['txtCod'].value;
    let estac = this.formGest.controls['cmbEstado'].value;
    let opec = this.formGest.controls['cmbOpe'].value;
    let ubic = this.formGest.controls['txtUbi'].value;
    let dnic = this.formGest.controls['txtDni'].value;
    let obsc = this.formGest.controls['txtObs'].value;

    if(this.body.ope !=3){
      if(sede==null){
        this.snackbar('Seleccion una sede');
        return;
      }
      if(codPa=='' || codPa==null){
        this.snackbar('Ingreso el Código Patrimonial');
        return;
      }
      if(estac==null){
        this.snackbar('Seleccion una estado');
        return;
      }
      if(opec==null){
        this.snackbar('Seleccion una estado de operatividad');
        return;
      }
      if(ubic=='' || ubic==null){
        this.snackbar('Ingrese una ubicación');
        return;
      }
      if(dnic=='' || dnic==null){
        this.snackbar('Ingrese un DNI');
        return;
      }
    }else{
      codPa = this.body.entity.bien.codPatrimonio;
      sede = this.body.entity.sede.codigo;

    }
    let data = {
                  'lista': [
                    {
                      'bien': {
                        'codPatrimonio': codPa
                      },
                      'ubi': ubic,
                      'dni': dnic,
                      'estado': estac,
                      'obs': obsc=='-'?null:obsc==''?null:obsc,
                      'operativo': opec,
                      'sede': {
                        "id": sede
                      }
                    }
                  ],
                  "user": localStorage.getItem('usuario')
                };
    
    

    this.inventarioService.postInventario(this.body.ope,data)
      .subscribe(res=>{
        if(res.estado == 1){
          this.snackbar(res.msg);
          this.dialogRef.close(true)
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
