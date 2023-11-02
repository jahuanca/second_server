const r=require('../services/request')
const rutas=require('./../rutas')
const models= require('./../models')

const headersODATA={
    'authorization': rutas.auth,
    'cookie': rutas.cookie,
    'accept': 'application/json',
    'content-type': 'application/json',
    'User-Agent': 'Mozilla/5.0',
}

module.exports={
    llenarAll,
}

async function llenarTurno(){
    try {
        let resultODATA=await r.get(rutas.RUTA_TURNO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                data: data, 
                model: models.Turno,
                success: true, 
                message: `Exito al consultar, ${data.length} turnos.`};
            await models.Turno.bulkCreate(turnos)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Turnos: Error ${resultODATA.response.statusCode}`
            };
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Turnos: Error general ${e}`
        };
    }
    
}

async function llenarAll(req, res){
    const finalResult = [
        await llenarTurno(),
        await llenarFundo(),
        await llenarUsuario(),
        await llenarEtapa(),
        await llenarCampo(),
        await llenarCultivo(),
        await llenarVariedad(),
        await llenarTrazabilidad(),
        await llenarEtiqueta(),
        await llenarDestino(),
        await llenarJaba(),
        await llenarFormato(),
    ];
    for(const single of finalResult){
        if(!single.success){
            console.log(single.message)
            return res.status(200).json(
            { 
                success: false,
                message: single.message 
            }
        )}
    }
    await deleteAll();
    for(const single of finalResult){
        await single.model.bulkCreate(
            single.data
        )
        console.log(single.message)
    }
    return res.status(200).json(
        { 
            success: true,
            message: `Backend actualizado con éxito.`
        }
    )
    /*await deleteAll();
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
    */
}

async function deleteAll(){
    try {
        /*await models.Zpp_Int.destroy({where: {}})
        await models.Conclusion.destroy({where: {}})*/
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
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Formato,
                data: data, 
                success: true,
                message: `Exito al consultar, ${data.length} formatos.`};
            await models.Formato.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Formatos: Error ${resultODATA.response.statusCode}`
            };
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Formatos: Error general ${e}`
        };
    }
}

async function llenarJaba(){
    try {
        let resultODATA=await r.get(rutas.RUTA_JABA, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Jaba,
                data: data, 
                success: true, 
                message: `Exito al consultar, ${data.length} jabas.`};
            await models.Jaba.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Jabas: Error ${resultODATA.response.statusCode}`
            };
            
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Jabas: Error general ${e}`
        };
    }
}

async function llenarDestino(){
    try {
        let resultODATA=await r.get(rutas.RUTA_DESTINO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Destino,
                data: data, 
                success: true, 
                message: `Exito al consultar, ${data.length} destinos.`};
            await models.Destino.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Destinos: Error ${resultODATA.response.statusCode}`
            };
            
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Destinos: Error general ${e}`
        };
    }
}

async function llenarEtiqueta(){
    try {
        let resultODATA=await r.get(rutas.RUTA_ETIQUETA, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Etiqueta,
                data: data, 
                success: true, 
                message: `Exito al consultar, ${data.length} etiquetas.`};
            await models.Etiqueta.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Etiquetas: Error ${resultODATA.response.statusCode}`
            };
            
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Etiquetas: Error general ${e}`
        };
    }
}

async function llenarTrazabilidad(){
    try {
        let resultODATA=await r.get(rutas.RUTA_TRAZABILIDAD, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Trazabilidad,
                data: data, 
                success: true, 
                message: `Exito al consultar, ${data.length} trazabilidads.`};
            await models.Trazabilidad.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Trazabilidads: Error ${resultODATA.response.statusCode}`
            };
            
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Trazabilidads: Error general ${e}`
        };
    }
}

async function llenarFundo(){
    try {
        let resultODATA=await r.get(rutas.RUTA_FUNDO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Fundo,
                data: data, 
                success: true, 
                message: `Exito al consultar, ${data.length} fundos.`};
            await models.Fundo.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Fundos: Error ${resultODATA.response.statusCode}`
            };
            
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Fundos: Error general ${e}`
        };
    }
}

async function llenarCampo(){
    try {
        let resultODATA=await r.get(rutas.RUTA_CAMPO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Campo,
                data: data, 
                success: true, 
                message: `Exito al consultar, ${data.length} campos.`};
            await models.Campo.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Campos: Error ${resultODATA.response.statusCode}`
            };
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Campos: Error general ${e}`
        };
    }
}

async function llenarCultivo(){
    try {
        let resultODATA=await r.get(rutas.RUTA_CULTIVO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Cultivo,
                data: data, 
                success: true, 
                message: `Exito al consultar, ${data.length} cultivos.`};
            await models.Cultivo.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Cultivos: Error ${resultODATA.response.statusCode}`
            };
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Cultivos: Error general ${e}`
        };
    }
}

async function llenarVariedad(){
    try {
        let resultODATA=await r.get(rutas.RUTA_VARIEDAD, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Variedad,
                data: data, 
                success: true, 
                message: `Exito al consultar, ${data.length} variedads.`};
            await models.Variedad.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Variedads: Error ${resultODATA.response.statusCode}`
            };
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Variedads: Error general ${e}`
        };
    }
}

async function llenarEtapa(){
    try {
        let resultODATA=await r.get(rutas.RUTA_ETAPA, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Etapa,
                data: data, 
                success: true, 
                message: `Exito al consultar, ${data.length} etapas.`};
            await models.Etapa.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Etapas: Error ${resultODATA.response.statusCode}`
            };
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Etapas: Error general ${e}`
        };
    }
}

async function llenarUsuario(){
    try {
        let resultODATA=await r.get(rutas.RUTA_USUARIO, headersODATA)
        if(resultODATA.response.statusCode>= 200 && resultODATA.response.statusCode <= 299){
            let data=resultODATA.response.body.d.results;
            return {
                model: models.Usuario,
                data: data, 
                success: true, 
                message: `Exito al consultar, ${data.length} usuarios.`};
            await models.Usuario.bulkCreate(data)
        }else{
            return {
                data: [], 
                success: false, 
                message: `Usuarios: Error ${resultODATA.response.statusCode}`
            };
            
        }
    }catch(e){
        return {
            data: [], 
            success: false, 
            message: `Usuarios: Error general ${e}`
        };
    }
}

function get(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
  }