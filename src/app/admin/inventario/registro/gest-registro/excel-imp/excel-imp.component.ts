import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {FormBuilder, FormGroup} from '@angular/forms';
import {InventarioService} from '../../../../../core/services/inventario.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExcelService} from '../../../../../core/services/excel/excel.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-excel-imp',
  templateUrl: './excel-imp.component.html',
  styleUrls: ['./excel-imp.component.scss']
})
export class ExcelImpComponent implements OnInit {

  sedesList = [];
  formGest:FormGroup;
  sedeUserList:any;
  namefile = null;
  lista=[];
  dataFile:any = [];

  constructor(
    public dialogRef: MatDialogRef<ExcelImpComponent>,
    @Inject(MAT_DIALOG_DATA) public body:any,
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService,
    private _snackBar: MatSnackBar,
    public excelservice: ExcelService,
  ) { }

  ngOnInit(): void {
    this.getSedes();
    this.buildForm();
  }

  buildForm(){
    this.formGest = this.formBuilder.group({
      cmbSede: [null],
      inputfile: [null]
    });
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

  onNoClick():void{
    this.dialogRef.close();
  }

  onClick(){
    let sede = this.formGest.controls['cmbSede'].value;
    if(sede==null){
      this.snackbar("Seleccione una sede");
      return;
    }
    if(this.dataFile.length == 0){
      this.snackbar("Ingrese un archivo");
      return;
    }
    
    for (let i = 1; i < this.dataFile.length; i++) {
      if(this.dataFile[i].length>0){
        let inve = {
          'bien': {
            'codPatrimonio': this.dataFile[i][0]==undefined?null:this.dataFile[i][0]+""
          },
          'ubi': this.dataFile[i][1]==undefined?null:this.dataFile[i][1]+"",
          'dni': this.dataFile[i][4]==undefined?null:this.dataFile[i][4]+"",
          'estado': this.dataFile[i][2]==undefined?null:this.dataFile[i][2]+"",
          'obs': this.dataFile[i][5]==undefined?null:this.dataFile[i][5]+"",
          'operativo': this.dataFile[i][3]==undefined?null:this.dataFile[i][3]+"",
          'sede': {
            'id': sede
          }
        };
        this.lista.push(inve);
      }
    }
    
    let request = { 
                    'lista': this.lista,
                    'user': localStorage.getItem('usuario')
                  }
    
    this.inventarioService.importInve(request)
      .subscribe(res=>{
        this.snackbar(res.msg);
        this.dialogRef.close(true);
    })
    
  }


  snackbar(msj:any){
    this._snackBar.open(msj,'',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      
    });
  }

  onFileChange(evt: any) {
    this.dataFile = [];
    /* wire up file reader */
    this.namefile = evt.target.files[0].name;
    const target: DataTransfer = <DataTransfer> (evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      this.dataFile = this.excelservice.importFromFile(bstr);
    };
    reader.readAsBinaryString(target.files[0]);
  }


}
