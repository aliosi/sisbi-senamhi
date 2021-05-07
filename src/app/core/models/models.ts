import {MarkItem} from './mark.model';

export class MarkModelsItem {
  id: number;
  descripcion: string;
  fech_reg: Date;
  estado: string;
  marca: MarkItem;
  nombremarca: string;

}

export class MarkModels implements MarkModelsItem {
  id: number;
  descripcion: string;
  fech_reg: Date;
  estado: string;
  marca: MarkItem;
  nombremarca: string;

  constructor(data: MarkModelsItem) {
    // console.log('data2');
    // console.log(data);
    // console.log('data2');
    //
    // // this.id = data[0].id;
    // // console.log(data[0].id);
    //
    // console.log(this.descripcion);


  }
}
