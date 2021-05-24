import {environment} from '../../../environments/environment';

export class routes_back {

  public static SISBI_ESTADO_SERVICE_API = `${environment.url_api}/sisbi_estado`;
  public static SISBI_MARCA_SERVICE_API = `${environment.url_api}/sisbi_marca`;
  public static SISBI_MODELO_SERVICE_API = `${environment.url_api}/sisbi_modelo`;
  public static SISBI_MODELO_BY_MARK_SERVICE_API = `${environment.url_api}/sisbi_modelo/byMarca`;
  public static SISBI_SOLICITUD_CAMBIO_SERVICE_API = `${environment.url_api}/sisbi_solicitud_cambio`;
  public static SISBI_SUB_CATEGORIA_SERVICE_API = `${environment.url_api}/sisbi_sub_cta`;
  public static SISBI_SUB_CATEGORIA_MAYOR_SERVICE_API = `${environment.url_api}/sisbi_sub_cta/mayor`;
  public static SISBI_TIPO_BIEN_SERVICE_API = `${environment.url_api}/sisbi_tipo_bien`;
  public static SISBI_AUDTORIA_SERVICE_API = `${environment.url_api}/sisbi_auditoria`;
  public static SISBI_SEDES_SERVICE_API = `${environment.url_api}/sede`;
  //bienes
  public static SISBI_BIEN_INT_SERVICE_API = `${environment.url_api}/sisbi_bien/senamhi`;
  public static SISBI_BIEN_EXT_SERVICE_API = `${environment.url_api}/sisbi_bien/externo`;
  public static SISBI_BIEN_IMPORT_SERVICE_API = `${environment.url_api}/sisbi_bien/import`;
  public static SISBI_BIEN_SENAMHI_SERVICE_API = `${environment.url_api}/sisbi_bien/senamhi`;
  //solicitudes
  public static SISBI_SOLICITUD_CAMBIO_BIEN_SERVICE_API = `${environment.url_api}/sisbi_solicitud_cambio`;
  public static SISBI_LISTA_SOLICITUDES_CAMBIOS_BIEN_SERVICE_API = `${environment.url_api}/sisbi_solicitud_cambio/patrimonio`;
  public static SISBI_LISTA_SOLICITUDES_USER_CAMBIOS_BIEN_SERVICE_API = `${environment.url_api}/sisbi_solicitud_cambio`;
  //Auth
  public static SISBI_AUTH_SERVICE_API=`${environment.url_api}/login`;
  //Inventario
  public static SISBI_ANIOS_INV_API = `${environment.url_api}/sisbi_inventario/anio`;
  public static SISBI_SEDE_USER_API = `${environment.url_api}/sisbi_inventario/sede`;
  public static SISBI_INV_SEDE_API = `${environment.url_api}/sisbi_inventario/`;
  public static SISBI_REPORT_INV_API = `${environment.url_api}/sisbi_inventario/report1`;
  public static SISBI_REPORT_CONF_API = `${environment.url_api}/sisbi_inventario/report2`;
  public static SISBI_REPORT_SIN_API = `${environment.url_api}/sisbi_inventario/report3`;
  public static SISBI_ESTADO_INV_API = `${environment.url_api}/sisbi_inventario/estado`;
  public static SISBI_INSERT_INVI_API = `${environment.url_api}/sisbi_inventario/`;
  public static SISBI_IMPORT_INVI_API = `${environment.url_api}/sisbi_inventario/import`;


}
