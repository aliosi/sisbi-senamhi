import {MarkModels} from './models';
// import {MarkItem} from './mark.model';

export class MarkModelsModel {
  lista: MarkModels[];
  msg: string;
}

export class MarkModelsModele implements MarkModelsModel {
  lista: MarkModels[]=[];
  msg: string;
  constructor(data?: MarkModelsModel) {
    // console.log('data');
    data.lista.forEach((data, index)=>{
      this.lista.push(
        {
          id:data.id,
          descripcion: data.descripcion,
          fech_reg: data.fech_reg,
          estado: data.estado,
          marca: data.marca,
          nombremarca: data.marca.descripcion
        }
      )
    })
    this.msg = data.msg || null;
  }
}




