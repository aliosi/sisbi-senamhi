import {EstateItem, EstatesExternItem} from './estates-intern.model';
import {EstateSolicitudItem} from './estates-intern.model';
import {MarkItem} from './mark.model';
import {MarkModels} from './models';
import * as moment from 'moment';
export class EstatesIntern {
  msg: string;
  lista: EstateItem[];
  error: string;
}

export class EstateInternModel implements EstatesIntern {
  msg: string;
  lista: EstateItem[] = [];
  error: string;

  constructor(data?: EstatesIntern) {
    data.lista.forEach((data, index) => {
      // console.log('entra a formatear');
      this.lista.push(
        {
          id: data.id,
          codPatrimonio: data.codPatrimonio,
          descripcion: data.descripcion,
          marca: data.marca,
          descmarca: data.marca?.descripcion,
          modelo: data.modelo,
          descmodelo: data.modelo?.descripcion,
          nSerie: data.nSerie,
          nOrden: data.nOrden,
          fechOrden: data.fechOrden,
          nNea: data.nNea,
          fechNea: data.fechNea,
          subCategoria: data.subCategoria,
          descSubcategoria: data.subCategoria?.descripcion,
          sede: data.sede,
          descsede: data.sede?.descripcion,
          fechMovimiento: data.fechMovimiento,
          fechAlta: data.fechAlta,
          solicitud: data.solicitud,
          idSolicitud: data.solicitud?.id,
          marcaSolicitud: data.solicitud?.marca,
          // marcadescripcionSolicitud: data.solicitud.descripcion,
          modeloSolicitud: data.solicitud?.modelo,
          // modelodescripcionSolicitud: data.solicitud.modelo.descripcion,
          nSerieSolicitud: data.solicitud?.nSerie,
          userSolicitud: data.solicitud?.user,
          telSolicitud: data.solicitud?.tel,
          imgSolicitud: data.solicitud?.img,
          estadoSolicitud: data.solicitud?.estado,
          fech_regSolicitud: data.solicitud?.fechaReg,
          color: data?.color,
        }
      );
    });
    this.msg = data.msg;
  }
}

// bienes externos
export class EstatesExtern {
  msg: string;
  lista: EstatesExternItem[];
  error: string;
}

export class EstateExternModel implements EstatesExtern {
  msg: string;
  lista: EstatesExternItem[] = [];
  error: string;

  constructor(data?: EstatesExtern) {
    data.lista.forEach((data, index) => {
      this.lista.push(
        {
          id: data.id,
          descripcion: data.descripcion,
          marca: data.marca,
          descmarca: data.marca.descripcion,
          modelo: data.modelo,
          descmodel: data.modelo.descripcion,
          nSerie: data.nSerie,
          sede: data.sede,
          descsede: data.sede.descripcion,
          convenio: data.convenio,
          descconvenio: data.convenio?.descripcion,
          administrado: data.administrado,
          descadministrado: data.administrado?.descripcion,
        });
    });
    this.msg = data.msg;
  }
}

