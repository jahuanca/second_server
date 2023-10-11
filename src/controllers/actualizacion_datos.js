const r=require('../services/request')
const rutas=require('./../rutas')
const models= require('./../models')

const headersODATA={
    //QAS
    //'Authorization': 'Basic bnNvc2E6TmVzdG9yLjIwMjI=',
    //'Cookie': 'SAP_SESSIONID_PRD_300=Auei246wSKx843wANOONqSsJcr1jMBHulIgS4t7kLGU%3d; sap-usercontext=sap-client=300'
    //PRD 
    'Authorization': 'Basic SU5URVJGQVpfUklTOkFndkAyMDIzJCsr',
    'Cookie': 'SAP_SESSIONID_PRD_300=MKVebBUtEchKzv1Ze-3FmMIrGwNn7RHukT8SUjKyrPM%3d; Path=/; Secure; HttpOnly;'

}

module.exports={
    llenarAll,
}

async function llenarTurno(){
    try {
        let resultODATA=await r.get(rutas.RUTA_TURNO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Turnos: ' + resultODATA.response.body.d.results.length);
            let turnos=resultODATA.response.body.d.results;
            await models.Turno.destroy({where: {}})
            await models.Turno.bulkCreate(turnos)
        }else{
            console.log('Turnos: Error '+resultODATA.response.statusCode)
            
        }
    }catch(e){
        console.log('Error '+ e);
    }
    
}

async function llenarAll(){
    await deleteAll();
    await llenarTurno();
    await llenarFundo();
    await llenarUsuario();
    await llenarEtapa();
    await llenarCampo();
    await llenarCultivo();
    await llenarVariedad();
    await llenarTrazabilidad();
    await llenarEtiqueta();
    await llenarDestino();
    await llenarJaba();
    await llenarFormato();
    console.log('Terminado.')
}

async function deleteAll(){
    try {
        await models.Formato.destroy({where: {}})
        await models.Jaba.destroy({where: {}})
        await models.Destino.destroy({where: {}})
        await models.Etiqueta.destroy({where: {}})
        await models.Trazabilidad.destroy({where: {}})
        await models.Variedad.destroy({where: {}})
        await models.Cultivo.destroy({where: {}})

        await models.Fundo.destroy({where: {}})
        await models.Usuario.destroy({where: {}})
        await models.Etapa.destroy({where: {}})
        await models.Campo.destroy({where: {}})
        await models.Turno.destroy({where: {}})   
    } catch (error) {
        console.log('ERROR AL ELIMINAR '+ error)
    }
}

async function llenarFormato(){
    try {
        let resultODATA=await r.get(rutas.RUTA_FORMATO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Formatos: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Formato.bulkCreate(data)
        }else{
            console.log('Formatos: Error '+resultODATA.response.statusCode)
            
        }
    }catch(e){
        console.log('Error Formato:'+ e);
    }
}

async function llenarJaba(){
    try {
        let resultODATA=await r.get(rutas.RUTA_JABA, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Jabas: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Jaba.bulkCreate(data)
        }else{
            console.log('Jabas: Error '+resultODATA.response.statusCode)
            
        }
    }catch(e){
        console.log('Error Jaba:'+ e);
    }
}

async function llenarDestino(){
    try {
        let resultODATA=await r.get(rutas.RUTA_DESTINO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Destinos: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Destino.bulkCreate(data)
        }else{
            console.log('Destinos: Error '+resultODATA.response.statusCode)
            
        }
    }catch(e){
        console.log('Error Destino:'+ e);
    }
}

async function llenarEtiqueta(){
    try {
        let resultODATA=await r.get(rutas.RUTA_ETIQUETA, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Etiquetas: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Etiqueta.bulkCreate(data)
        }else{
            console.log('Etiquetas: Error '+resultODATA.response.statusCode)
            
        }
    }catch(e){
        console.log('Error Etiqueta:'+ e);
    }
}

async function llenarTrazabilidad(){
    try {
        let resultODATA=await r.get(rutas.RUTA_TRAZABILIDAD, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Trazabilidads: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Trazabilidad.bulkCreate(data)
        }else{
            console.log('Trazabilidads: Error '+resultODATA.response.statusCode)
            
        }
    }catch(e){
        console.log('Error Trazabilidad:'+ e);
    }
}

async function llenarFundo(){
    try {
        let resultODATA=await r.get(rutas.RUTA_FUNDO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Fundos: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Fundo.bulkCreate(data)
        }else{
            console.log('Fundos: Error '+resultODATA.response.statusCode)
            
        }
    }catch(e){
        console.log('Error Fundo:'+ e);
    }
}

async function llenarCampo(){
    try {
        let resultODATA=await r.get(rutas.RUTA_CAMPO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Campos: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Campo.bulkCreate(data)
        }else{
            console.log('Campos: Error '+resultODATA.response.statusCode)
        }
    }catch(e){
        console.log('Error Campo:'+ e);
    }
}

async function llenarCultivo(){
    try {
        let resultODATA=await r.get(rutas.RUTA_CULTIVO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Cultivos: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Cultivo.bulkCreate(data)
        }else{
            console.log('Cultivos: Error '+resultODATA.response.statusCode)
        }
    }catch(e){
        console.log('Error Cultivo: '+ e);
    }
}

async function llenarVariedad(){
    try {
        let resultODATA=await r.get(rutas.RUTA_VARIEDAD, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Variedads: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Variedad.bulkCreate(data)
        }else{
            console.log('Variedads: Error '+resultODATA.response.statusCode)
        }
    }catch(e){
        console.log('Error Variedad:'+ e);
    }
}

async function llenarEtapa(){
    try {
        let resultODATA=await r.get(rutas.RUTA_ETAPA, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Etapas: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Etapa.bulkCreate(data)
        }else{
            console.log('Etapas: Error '+resultODATA.response.statusCode)
        }
    }catch(e){
        console.log('Error '+ e);
    }
}

async function llenarUsuario(){
    try {
        let resultODATA=await r.get(rutas.RUTA_USUARIO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            console.log('Usuarios: ' + resultODATA.response.body.d.results.length);
            let data=resultODATA.response.body.d.results;
            await models.Usuario.bulkCreate(data)
        }else{
            console.log('Usuarios: Error '+resultODATA.response.statusCode)
            
        }
    }catch(e){
        console.log('Error '+ e);
    }
}

function get(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
  }