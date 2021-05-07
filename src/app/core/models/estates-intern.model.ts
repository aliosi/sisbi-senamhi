import {AdministrativoModel} from './administrativo.model';
import {ConvenioModel} from './convenio.model';
import {MarkItem} from './mark.model';
import {MarkModels} from './models';
import {SedeModel} from './sede.model';
import {SubcategoriaItem, SubCategoryModel} from './sub-category.model';
import * as moment from 'moment';

export class EstateItem {
  id: 0;
  codPatrimonio: string;
  descripcion: string;
  marca: MarkItem;
  descmarca: string;
  modelo: MarkModels;
  descmodelo: string;
  nSerie: string;
  nOrden: string;
  fechOrden: string;
  nNea: string;
  fechNea: string;
  subCategoria: SubcategoriaItem;
  descSubcategoria: string;
  sede: SedeModel;
  descsede: string;
  fechMovimiento: string;
  fechAlta: string;
  solicitud: EstateSolicitudItem;
  idSolicitud: number;
  marcaSolicitud: string;
  // marcadescripcionSolicitud: string;
  modeloSolicitud: string;
  // modelodescripcionSolicitud: string;
  nSerieSolicitud: string;
  userSolicitud: string;
  telSolicitud: string;
  imgSolicitud: { file: string };
  estadoSolicitud: string;
  fech_regSolicitud: string;
  color: string;
}

export class EstatesExternItem {
  id: number;
  descripcion: string;
  marca: MarkItem;
  descmarca: string;
  modelo: MarkModels;
  descmodel: string;
  nSerie: number;
  sede: SedeModel;
  descsede: string;
  convenio: ConvenioModel;
  descconvenio: string;
  administrado: AdministrativoModel;
  descadministrado: string;

}

export class EstateSolicitudItem {
  comentarior: string;
  estado: string;
  fechaReg: string;
  id: number;
  img: { file: string };
  marca: string;
  modelo: string;
  descripcion: string;
  fech_reg: string;
  nSerie: string;
  tel: string;
  user: string;
}

export class EstateSolicitudModel {
  solicitud: EstateSolicitudItem;
  msg: string;
  error: string;
}

// export class EstateModell implements EstateItem {
//   administrado: AdministrativoModel;
//   codPatrimonio: string;
//   convenio: ConvenioModel;
//   descripcion: string;
//   fechAlta: string;
//   fechMovimiento: string;
//   fechNea: string;
//   fechOrden: string;
//   id: 0;
//   marca: MarkItem;
//   modelo: MarkModels;
//   nNea: string;
//   nOrden: string;
//   nSerie: string;
//   sede: SedeModel;
//   subCategoria: SubCategoryModel;
//
//   constructor(data: EstateItem) {
//     // this.administrado = data.administrado;
//     // this.codPatrimonio = data.codPatrimonio;
//     // this.convenio = data.convenio;
//     // this.descripcion = data.descripcion;
//     // this.fechAlta = data.fechAlta;
//     // this.fechMovimiento = data.fechMovimiento;
//     // this.fechNea = data.fechNea;
//     // this.fechOrden = data.fechOrden;
//     // this.id = data.id;
//     // this.marca = data.marca;
//     // this.modelo = data.modelo;
//     // this.nNea = data.fechOrden;
//     // this.nOrden = data.nOrden;
//     // this.nSerie = data.nSerie;
//     // this.sede = data.sede;
//     // this.subCategoria = data.subCategoria;
//   }
// }
