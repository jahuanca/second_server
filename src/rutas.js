'use strict'
const RUTA_SBS='http://serviciosweb.sbs.gob.pe/api/tipocambio/';
//QAS
 //const RUTA_ODATA='http://200.107.154.142:8000/sap/xi/zfi_int_tc_sbs/webfi?sap-client=200';
//PRD
//const RUTA_ODATA='http://200.107.154.145:8000/sap/xi/zfi_int_tc_sbs/webfi?sap-client=300';
const RUTA_ODATA='https://prd.sap.agrovisioncorp.com/sap/xi/zfi_int_tc_sbs/webfi?sap-client=300';
const TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWdyb3Zpc2lvbiIsInN1YiI6ImFncm92aXNpb24iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiTWFuYWdlciIsIlN1cGVydmlzb3IiXSwibmJmIjoxNjU5NzI4NzEwLCJleHAiOjE2OTEyNjQ3MTAsImlzcyI6Imh0dHA6Ly9qd3RhdXRoenNydi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6IjA5OTE1M2MyNjI1MTQ5YmM4ZWNiM2U4NWUwM2YwMDIyIn0._t7jCcMin_EhwsiWPoM0qSBSkbjF7EspmK1QByKv6a4';
const RUTA_TURNO='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_TURNO_SRV/YWTGW_TURNO?$format=json'
const RUTA_FUNDO='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_FUNDO_SRV/YWTGW_FUNDO?$format=json'
const RUTA_ETAPA='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_ETAPA_SRV/YWTGW_ETAPA?$format=json'
const RUTA_CAMPO='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_CAMPO_SRV/YWTGW_CAMPO?$format=json'
const RUTA_CULTIVO='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_CULTIVO_SRV/YWTGW_CULTIVO?$format=json'
const RUTA_VARIEDAD='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_VARIEDAD_SRV/YWTGW_VARIEDAD?$format=json'
const RUTA_USUARIO='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_USUARIO_SRV/YWTGW_USUARIO?$format=json'
const RUTA_TRAZABILIDAD='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_TRAZABILIDAD_SRV/YWTGW_TRAZA?$format=json'
const RUTA_ETIQUETA='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_ETIQUETA_SRV/YWTGW_ETIQUETA?$format=json'
const RUTA_DESTINO='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_DESTINO_SRV/YWTGW_DESTINO?$format=json'
const RUTA_JABA='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWT_MOVIL_TIPOJABA_SRV/YWTGW_TIPOJABA?$format=json'
const RUTA_FORMATO='https://prd.sap.agrovisioncorp.com/sap/opu/odata/sap/YWTGW_GET_TIPOFORMATO_SRV/ywtgw_get_tipoformato_set?$format=json'
const RUTA_MATERIAL='https://prd.sap.agrovisioncorp.com/zpp_int_rmp/webpp?sap-client=300'


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
}