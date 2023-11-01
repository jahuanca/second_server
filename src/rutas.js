'use strict'
let mandante= 'qas';
const rootServer={
    'prd': 'https://prd.sap.agrovisioncorp.com/',
    'qas': 'https://qas.sap.agrovisioncorp.com/'
}

const auth={
    'prd': 'Basic SU5URVJGQVpfUklTOkFndkAyMDIzJCsr',
    'qas': 'Basic SU5URVJGQVpfUklTOisrQWd2QDIwMjMkKys='
}

const cookie={
    'prd': 'SAP_SESSIONID_PRD_300=MKVebBUtEchKzv1Ze-3FmMIrGwNn7RHukT8SUjKyrPM%3d; Path=/; Secure; HttpOnly;',
    'qas': 'SAP_SESSIONID_QAS_300=g8pB-Le6OyA7nURHXa9ilRdANotynhHupEsS4t7kLGU%3d; sap-usercontext=sap-client=300'
}

const mandantes = {
    'dev': '100',
    'qas': '300',
    'prd': '200'
  };

const RUTA_SBS='http://serviciosweb.sbs.gob.pe/api/tipocambio/';
//QAS
 //const RUTA_ODATA='http://200.107.154.142:8000/sap/xi/zfi_int_tc_sbs/webfi?sap-client=200';
//PRD
//const RUTA_ODATA='http://200.107.154.145:8000/sap/xi/zfi_int_tc_sbs/webfi?sap-client=300';
const RUTA_ODATA=`${rootServer[mandante]}sap/xi/zfi_int_tc_sbs/webfi?sap-client=300`;
const TOKEN=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWdyb3Zpc2lvbiIsInN1YiI6ImFncm92aXNpb24iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiTWFuYWdlciIsIlN1cGVydmlzb3IiXSwibmJmIjoxNjU5NzI4NzEwLCJleHAiOjE2OTEyNjQ3MTAsImlzcyI6Imh0dHA6Ly9qd3RhdXRoenNydi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6IjA5OTE1M2MyNjI1MTQ5YmM4ZWNiM2U4NWUwM2YwMDIyIn0._t7jCcMin_EhwsiWPoM0qSBSkbjF7EspmK1QByKv6a4`;
const RUTA_TURNO=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_TURNO_SRV/YWTGW_TURNO?$format=json`
const RUTA_FUNDO=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_FUNDO_SRV/YWTGW_FUNDO?$format=json`
const RUTA_ETAPA=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_ETAPA_SRV/YWTGW_ETAPA?$format=json`
const RUTA_CAMPO=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_CAMPO_SRV/YWTGW_CAMPO?$format=json`
const RUTA_CULTIVO=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_CULTIVO_SRV/YWTGW_CULTIVO?$format=json`
const RUTA_VARIEDAD=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_VARIEDAD_SRV/YWTGW_VARIEDAD?$format=json`
const RUTA_USUARIO=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_USUARIO_SRV/YWTGW_USUARIO?$format=json`
const RUTA_TRAZABILIDAD=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_TRAZABILIDAD_SRV/YWTGW_TRAZA?$format=json`
const RUTA_ETIQUETA=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_ETIQUETA_SRV/YWTGW_ETIQUETA?$format=json`
const RUTA_DESTINO=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_DESTINO_SRV/YWTGW_DESTINO?$format=json`
const RUTA_JABA=`${rootServer[mandante]}sap/opu/odata/sap/YWT_MOVIL_TIPOJABA_SRV/YWTGW_TIPOJABA?$format=json`
const RUTA_FORMATO=`${rootServer[mandante]}sap/opu/odata/sap/YWTGW_GET_TIPOFORMATO_SRV/ywtgw_get_tipoformato_set?$format=json`
const RUTA_MATERIAL=`${rootServer[mandante]}zpp_int_rmp/webpp?sap-client=300`
const RUTA_TOKEN=`${rootServer[mandante]}sap/xi/zpp_int_rmp/webpp?sap-client=${mandantes[mandante]}`
const RUTA_ZPP_INT_RMP=`${rootServer[mandante]}sap/xi/zpp_int_rmp/webpp?sap-client=${mandantes[mandante]}`
const RUTA_ZPP_INT_VIAJE=`${rootServer[mandante]}sap/xi/zpp_int_viaje/webpp?sap-client=${mandantes[mandante]}`


module.exports ={
    token: TOKEN,
    rutaSBS: RUTA_SBS,
    rutaODATA: RUTA_ODATA,
    RUTA_TURNO,
    RUTA_FUNDO,
    RUTA_USUARIO,
    RUTA_ETAPA,
    RUTA_CAMPO,
    RUTA_CULTIVO,
    RUTA_VARIEDAD,
    RUTA_TRAZABILIDAD,
    RUTA_ETIQUETA,
    RUTA_DESTINO,
    RUTA_JABA,
    RUTA_FORMATO,
    RUTA_MATERIAL,
    RUTA_TOKEN,
    RUTA_ZPP_INT_RMP,
    auth: auth[mandante],
    cookie: cookie[mandante],
    RUTA_ZPP_INT_VIAJE,
}