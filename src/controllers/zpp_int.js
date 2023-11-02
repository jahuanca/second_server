'use strict'
const models = require('../models')
const sincronizar = require('./sincronizar')

async function getZpp_IntsCount(req, res) {
    let [err, zpp_ints] = await get(models.Zpp_Int.count({
        where: { estado: 'A' },
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (zpp_ints == null) return res.status(404).json({ message: `Zpp_Ints nulos` })
    res.status(200).json(zpp_ints)
}

async function getZpp_IntsByLimitAndOffset(req, res) {
    let [err, zpp_ints] = await get(models.Zpp_Int.findAll({
        where: { estado: 'A' },
        offset: req.params.offset ? parseInt(req.params.offset) : 0,
        limit: req.params.limit ? parseInt(req.params.limit) : 10,
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (zpp_ints == null) return res.status(404).json({ message: `Zpp_Ints nulos` })
    res.status(200).json(zpp_ints)
}

async function getZpp_Ints(req, res) {
    let [err, zpp_ints] = await get(models.Zpp_Int.findAll({
        where: { estado: 'A' },
        include: [{ all: true }]
        /*attributes: ['FECHARECEPCION', 'PLACAVEHICULO', 'IDRECEPCION'],
        group: ['Zpp_Int.FECHARECEPCION', 'PLACAVEHICULO']*/
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (zpp_ints == null) return res.status(404).json({ message: `Zpp_Ints nulos` })
    res.status(200).json(zpp_ints)
}

async function getZpp_Int(req, res) {
    let [err, zpp_int] = await get(models.Zpp_Int.findOne({
        where: { id: req.params.id, estado: 'A' },
        include: [{ all: true }]
    }))
    console.log(err)
    if (err) return res.status(500).json({ message: `${err}` })
    if (zpp_int == null) return res.status(404).json({ message: `Zpp_Ints nulos` })
    res.status(200).json(zpp_int)
}

async function createZpp_Int(req, res) {
    const t = await models.sequelize.transaction();
    let detalles = JSON.parse(req.body.data)
    try {
        const conclusion = await models.Conclusion.create({
            accion: 'I',
            accion_usuario: 'Creo un nuevo conclusion.',
            PLACAVEHICULO: detalles[0].placavehiculo,
            FECHA: req.body.fecha,
            IDUSUCREA: detalles[0].usuariomod,
            ESTADO: 'A',
            ip: req.ip,
            usuario: 0

        }, { transaction: t });

        let elementos = [];
        for (let i = 0; i < detalles.length; i++) {
            const element = detalles[i];
            elementos.push(
                {
                    DESCARGA: element.descarga,
                    HORAENTREGA: element.horaentrega,
                    SALIDAPACKING: element.salidaPacking,
                    LUGARENTREGA: element.lugarentrega,
                    LUGARDESPACHO: element.lugardespacho,
                    LUGARSALIDA: element.lugarsalida,
                    ESTADO: element.estado,
                    ID: element.id,
                    GUIA_RM: element.guia_rm,
                    IDFUNDO: element.idfundo,
                    IDETAPA: element.idetapa,
                    IDCAMPO: element.idcampo,
                    IDTURNO: element.idturno,
                    IDFORMATO: element.idformato,
                    IDCULTIVO: element.idcultivo,
                    IDVARIEDAD: element.idvariedad,
                    IDTIPOETIQ: element.idtipoetiq,
                    IDTIPOJABA: element.idtipojaba,
                    IDTIPODOCU: element.idtipodocu,
                    IDDESTINO: element.iddestino,
                    idConclusion: conclusion.id,
                    IDTRAZABILIDAD: element.idtrazabilidad,
                    NUMERODOCUMENTO: element.numerodocumento,
                    NUMEROACOPIO: element.Numeroacopio,
                    PLACAVEHICULO: element.placavehiculo,
                    CANTIDADJABAS: element.cantidadjabas,
                    FECHARECEPCION: element.fecharecepcion,
                    FECHAMOD: element.fechamod,
                    USUARIOMOD: element.usuariomod,
                    USUARIORECEPCION: element.usuariorecepcion,
                    HORASMMOVILIDAD: element.horaSmMovilidad,
                    HORA_SM_CAMPO: element.hora_sm_campo,
                    HORA_SM_PACKING: element.hora_sm_packing,
                    PRODUCTOR: element.productor,

                    accion: 'I',
                    accion_usuario: 'Creo un nuevo zpp_int.',
                    ip: req.ip,
                    usuario: 0
                }
            )
        }
        let [err, zpp_int] = await get(models.Zpp_Int.bulkCreate(elementos, { transaction: t }))
        if (err) {
            console.log('Error ' + err)
            await t.rollback();
            return res.status(500).json({ message: `${err}` })
        }
        if (zpp_int == null) {
            await t.rollback();
            return res.status(404).json({ message: `Zpp_Ints nulos` })
        }
        await t.commit();
        await sincronizar.sincronizarDetalles(zpp_int, conclusion.id);
        res.status(200).json({
            'SUCCESS': "0",
            'IDRECEPCION': conclusion.id,
            'USER_SAP': 'local',
            'FECHA_TRANSF': Date(),
            'HORA_TRANSF': Date(),
            'ESTADO': 'Registrado',
            'MENSAJE': 'Este dato fue enviado al segundo servidor',
        })

    } catch (error) {
        await t.rollback();
        console.log(error)
        return res.status(200).json({
            'SUCCESS': "0",
            'ESTADO': 'No se pudo registrar',
            'MENSAJE': 'Este dato fue enviado al segundo servidor',
            'USER_SAP': 'local',
            'FECHA_TRANSF': Date(),
            'HORA_TRANSF': Date(),
        })
    }
}


async function createAllZpp_Int(req, res) {
    let data = JSON.parse(req.body.data)
    let elementos = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        elementos.push(
            {
                DESCARGA: element.descarga,
                HORAENTREGA: element.horaentrega,
                SALIDAPACKING: element.salidaPacking,
                LUGARENTREGA: element.lugarentrega,
                LUGARDESPACHO: element.lugardespacho,
                LUGARSALIDA: element.lugarsalida,
                ESTADO: element.estado,
                ID: element.id,
                GUIA_RM: element.guia_rm,
                IDFUNDO: element.idfundo,
                IDETAPA: element.idetapa,
                IDCAMPO: element.idcampo,
                IDTURNO: element.idturno,
                IDFORMATO: element.idformato,
                IDCULTIVO: element.idcultivo,
                IDVARIEDAD: element.idvariedad,
                IDTIPOETIQ: element.idtipoetiq,
                IDTIPOJABA: element.idtipojaba,
                IDTIPODOCU: element.idtipodocu,
                IDDESTINO: element.iddestino,
                IDVIAJE: 14,
                IDCONCLUSION: 14,
                IDTRAZABILIDAD: element.idtrazabilidad,
                NUMERODOCUMENTO: element.numerodocumento,
                NUMEROACOPIO: element.Numeroacopio,
                PLACAVEHICULO: element.placavehiculo,
                CANTIDADJABAS: element.cantidadjabas,
                FECHARECEPCION: element.fecharecepcion,
                FECHAMOD: element.fechamod,
                USUARIOMOD: element.usuariomod,
                USUARIORECEPCION: element.usuariorecepcion,
                HORASMMOVILIDAD: element.horaSmMovilidad,
                HORA_SM_CAMPO: element.hora_sm_campo,
                HORA_SM_PACKING: element.hora_sm_packing,
                PRODUCTOR: element.productor,

                accion: 'I',
                accion_usuario: 'Creo un nuevo zpp_int.',
                ip: req.ip,
                usuario: 0
            }
        )
    }
    let [err, zpp_int] = await get(models.Zpp_Int.bulkCreate(elementos))

    if (err) {
        console.log('Error ' + err)
        return res.status(500).json({ message: `${err}` })
    }
    if (zpp_int == null) {
        return res.status(404).json({
            'SUCCESS': "0",
            'ESTADO': 'No se pudo registrar',
            'MENSAJE': 'Este dato fue enviado al segundo servidor',
            'USER_SAP': 'local',
            'FECHA_TRANSF': Date(),
            'HORA_TRANSF': Date(),
        })
    }

    return res.status(200).json({
        'SUCCESS': "1",
        'ESTADO': 'No se pudo registrar',
        'MENSAJE': 'Este dato fue enviado al segundo servidor',
        'USER_SAP': 'local',
        'FECHA_TRANSF': Date(),
        'HORA_TRANSF': Date(),
    })

    res.status(200).json({
        'SUCCESS': "0",
        'IDRECEPCION': conclusion.id,
        'USER_SAP': 'local',
        'FECHA_TRANSF': Date(),
        'HORA_TRANSF': Date(),
        'ESTADO': 'Registrado',
        'MENSAJE': 'Este dato fue enviado al segundo servidor',
    })

}



async function updateZpp_Int(req, res) {
    let [err, zpp_int] = await get(models.Zpp_Int.update({
        //all fields to update

        accion: 'U',
        accion_usuario: 'Edito un zpp_int.',
        ip: req.ip,
        usuario: 0
    }, {
        where: {
            id: req.body.id, estado: 'A'
        },
        individualHooks: true,
        validate: false
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (zpp_int == null) return res.status(404).json({ message: `Zpp_Ints nulos` })
    res.status(200).json(zpp_int[1][0].dataValues)
}


async function deleteZpp_Int(req, res) {
    let [err, zpp_int] = await get(models.Zpp_Int.update({
        estado: 'I',

        accion_usuario: 'Elimino un zpp_int.',
        accion: 'D',
        ip: req.ip,
        usuario: 0
    }, {
        where: {
            id: req.params.id, estado: 'A'
        },
        individualHooks: true
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (zpp_int == null) return res.status(404).json({ message: `Zpp_Ints nulos` })
    res.status(200).json(zpp_int[1][0].dataValues)
}


function get(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}

module.exports = {
    getZpp_IntsCount,
    getZpp_IntsByLimitAndOffset,
    getZpp_Ints,
    getZpp_Int,
    createZpp_Int,
    createAllZpp_Int,
    updateZpp_Int,
    deleteZpp_Int
}