const r = require('../services/request')
const rutas = require('./../rutas')
const models = require('./../models')


module.exports = {
    sincronizarAll,
    sincronizarDetalles,
    sincronizarViaje,
}

async function sincronizarAll() {
    let [err, concluidos] = await get(models.Conclusion.findAll({
        where: {
            ESTADO: {
                [models.Sequelize.Op.or]: ['A', 'C']
            }
        },
        include: [{ all: true }]
    }))
    if (err){
        console.log(`Error al consultar datos de ZPP_INT:  ${err}`);
        return
    }
    if (concluidos.length == 0){
        console.log('No existen viajes por migrar')
        return
    }
    try {
        for (let i = 0; i < concluidos.length; i++) {
            let elements = [];
            let concluido = concluidos[i]
            for (let j = 0; j < concluido.Zpp_Ints.length; j++) {
                const element = concluido.Zpp_Ints[j];
                if(element.ESTADO!='M'){
                    elements.push(element)
                }
            }
            if(elements.length > 0) await sincronizarDetalles(elements, concluido.id)
            delete concluido.dataValues.Zpp_Ints
            if (concluido.dataValues.ESTADO == 'C') {
                await sincronizarViaje(concluido)
            }
        }
    } catch (e) {
        console.log(`Error ${e}`);
    }
}

async function sincronizarDetalles(elements, id) {
    let headersDetalles = {
        'authorization': rutas.auth,
        'cookie': rutas.cookie,
        'accept': 'application/json',
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'x-csrf-token': 'Fetch'
    }
    try {
        let resultODATA = await r.get(rutas.RUTA_ZPP_INT_RMP, headersDetalles)
        if (resultODATA.response.statusCode >= 200 && resultODATA.response.statusCode <= 299) {
            headersDetalles['x-csrf-token'] = resultODATA.response.headers['x-csrf-token'];
            let setCookie = resultODATA.response.headers['set-cookie'].slice(-1)
            headersDetalles['cookie'] = String(setCookie).split(',').pop();
            let result = await r.post(rutas.RUTA_ZPP_INT_RMP, elements, headersDetalles)
            if (result.response.statusCode >= 200 && result.response.statusCode <= 299) {
                console.log(`Exito al migrar detalles \n ${result.response.body}`)
                let [errZppInt, zpp_int] = await get(models.Zpp_Int.update({
                    ESTADO: 'M',
                }, {
                    where: {
                        idConclusion: id
                    }
                }))
                if (errZppInt) console.log(`Hubo un error al actualizar los detalles: ${errZppInt}`)
                return true;
            } else {
                console.log(`POST detalles: Error ${result.response.statusCode}`)
                return false;
            }
        } else {
            console.log(`GET token detalles: Error  ${resultODATA.response.statusCode}`)
            return false;
        }
    } catch (error) {
        console.log(`Error ${error}`)
        return false;
    }
}

async function sincronizarViaje(conclusion) {
    let headersConcluido = {
        'authorization': rutas.auth,
        'cookie': rutas.cookie,
        'accept': 'application/json',
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'x-csrf-token': 'Fetch'
    }
    try {
        let resultODATA = await r.get(rutas.RUTA_ZPP_INT_VIAJE, headersConcluido)
        if (resultODATA.response.statusCode >= 200 && resultODATA.response.statusCode <= 299) {
            headersConcluido['x-csrf-token'] = resultODATA.response.headers['x-csrf-token'];
            let setCookie = resultODATA.response.headers['set-cookie'].slice(-1)
            headersConcluido['cookie'] = String(setCookie).split(',').pop();
            let result = await r.post(rutas.RUTA_ZPP_INT_VIAJE, [conclusion], headersConcluido)
            if (result.response.statusCode >= 200 && result.response.statusCode <= 299) {
                console.log(`POST Concluido enviado exito \ ${result.response.body}`)
                let [errConclusion, c] = await get(models.Conclusion.update({
                    ESTADO: 'M'
                }, {
                    where: { id: conclusion.id }
                }))
                if (errConclusion) console.log(`No se pudo actualizar el estado de VIAJE ${errConclusion}`)
                return true;
            } else {
                console.log(`POST Concluido: Error  ${result.response.statusCode}`)
                return false;
            }
        } else {
            console.log(`GET token viaje: Error ${resultODATA.response.statusCode}`)
            return false;
        }
    } catch (e) {
        console.log(`Error ${e}`);
        return false;
    }
}

function get(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}