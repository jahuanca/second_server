'use strict'
const models = require('../models')
const { sincronizarViaje } = require('./sincronizar')

async function getConclusionsCount(req, res) {
    let [err, conclusions] = await get(models.Conclusion.count({
        where: { estado: 'A' },
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (conclusions == null) return res.status(404).json({ message: `Conclusions nulos` })
    res.status(200).json(conclusions)
}

async function getConclusionsByLimitAndOffset(req, res) {
    let [err, conclusions] = await get(models.Conclusion.findAll({
        where: { estado: 'A' },
        offset: req.params.offset ? parseInt(req.params.offset) : 0,
        limit: req.params.limit ? parseInt(req.params.limit) : 10,
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (conclusions == null) return res.status(404).json({ message: `Conclusions nulos` })
    res.status(200).json(conclusions)
}

async function getConclusions(req, res) {
    let [err, conclusions] = await get(models.Conclusion.findAll({

        include: [{ model: models.Zpp_Int, where: { estado: 'A' }, required: false }]
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (conclusions == null) return res.status(404).json({ message: `Conclusions nulos` })
    res.status(200).json(conclusions)
}

async function getConclusion(req, res) {
    let [err, conclusion] = await get(models.Conclusion.findOne({
        where: { id: req.params.id, estado: 'A' },
        include: [{ all: true }]
    }))
    console.log(err)
    if (err) return res.status(500).json({ message: `${err}` })
    if (conclusion == null) return res.status(404).json({ message: `Conclusions nulos` })
    res.status(200).json(conclusion)
}

async function createConclusion(req, res) {
    let conclusionLast={}
    let [errBusqueda, busqueda] = await get(
        models.Conclusion.findAll({
            where: {
                PLACAVEHICULO: req.body.PLACAVEHICULO,
                FECHA: req.body.FECHA,
                IDUSUCREA: req.body.IDUSUCREA,
                ESTADO: 'A',
            },
        })
    )
    if (errBusqueda) return res.status(500).json({ message: `${errBusqueda}` })
    if (busqueda.length > 0) {
        let [err, conclusion] = await get(models.Conclusion.update({
            IDVIAJE: req.body.IDVIAJE,
            ESTADO: req.body.ESTADO,
            PLACAVEHICULO: req.body.PLACAVEHICULO,
            FECHA: req.body.FECHA,
            FECHACREACION: req.body.FECHACREACION,
            FECHAVALIDA: req.body.FECHAVALIDA,
            IDUSUCREA: req.body.IDUSUCREA,
            IDUSUVALI: req.body.IDUSUVALI,
            HORALLEGADA: req.body.HORALLEGADA,
            HORADESPACHO: req.body.HORADESPACHO,
            HORASALIDA: req.body.HORASALIDA,
            LUGARLLEGADA: (req.body.LUGARLLEGADA).substring(0,19),
            LUGARDESPACHO: (req.body.LUGARDESPACHO).substring(0,19),
            LUGARSALIDA: (req.body.LUGARSALIDA).substring(0,19),
            ESTADO: 'C',

            accion: 'I',
            accion_usuario: 'Modifico un nuevo conclusion.',
            ip: req.ip,
            usuario: 0
        }, {
            where: {
                PLACAVEHICULO: req.body.PLACAVEHICULO,
                FECHA: req.body.FECHA,
                IDUSUCREA: req.body.IDUSUCREA,
                ESTADO: 'A',
            },
            individualHooks: true,
            validate: false
        }))
        console.log("modificado")
        console.log(err)
        if (err) return res.status(500).json({ message: `${err}` })
        if (conclusion == null) return res.status(404).json({ message: `Conclusions nulos` })
        await sincronizarViaje(conclusion[1][0]);
        conclusionLast=conclusion[1][0]
        
    } else {
        let [err, conclusion] = await get(models.Conclusion.create({
            IDVIAJE: req.body.IDVIAJE,
            CODVIAJE: req.body.CODVIAJE,
            PLACAVEHICULO: req.body.PLACAVEHICULO,
            FECHA: req.body.FECHA,
            FECHACREACION: req.body.FECHACREACION,
            FECHAVALIDA: req.body.FECHAVALIDA,
            IDUSUCREA: req.body.IDUSUCREA,
            IDUSUVALI: req.body.IDUSUVALI,
            HORALLEGADA: req.body.HORALLEGADA,
            HORADESPACHO: req.body.HORADESPACHO,
            HORASALIDA: req.body.HORASALIDA,
            LUGARLLEGADA: (req.body.LUGARLLEGADA).substring(0,19),
            LUGARDESPACHO: (req.body.LUGARDESPACHO).substring(0,19),
            LUGARSALIDA: (req.body.LUGARSALIDA).substring(0,19),
            ESTADO: 'C',

            accion: 'I',
            accion_usuario: 'Creo una nuevo conclusion.',
            ip: req.ip,
            usuario: 0
        }))
        console.log("creado")
        console.log(err)
        if (err) return res.status(500).json({ message: `${err}` })
        if (conclusion == null) return res.status(404).json({ message: `Conclusions nulos` })
        await sincronizarViaje(conclusion);
        conclusionLast=conclusion
    }

    return res.status(200).json({
        'SUCCESS': "1",
        'IDRECEPCION': conclusionLast.id,
        'USER_SAP': 'local',
        'FECHA_TRANSF': Date(),
        'HORA_TRANSF': Date(),
        'ESTADO': 'Enviado al segundo servidor',
        'MENSAJE': 'Este dato fue enviado al segundo servidor',
    })

    res.status(200).json({
        'SUCCESS': 0,
        'IDRECEPCION': -1,
        'USER_SAP': 'local',
        'FECHA_TRANSF': Date.now(),
        'HORA_TRANSF': Date.now(),
        'ESTADO': 'Enviado al segundo servidor',
        'MENSAJE': 'Este dato fue enviado al segundo servidor',
    })
}


async function updateConclusion(req, res) {
    let [err, conclusion] = await get(models.Conclusion.update({
        //all fields to update

        accion: 'U',
        accion_usuario: 'Edito un conclusion.',
        ip: req.ip,
        usuario: 0
    }, {
        where: {
            id: req.body.id, ESTADO: 'A'
        },
        individualHooks: true,
        validate: false
    }))
    if (err) return res.status(500).json({ message: `${err}` })
    if (conclusion == null) return res.status(404).json({ message: `Conclusions nulos` })
    res.status(200).json(conclusion[1][0].dataValues)
}


async function deleteConclusion(req, res) {
    let [err, conclusion] = await get(models.Conclusion.update({
        ESTADO: 'I',

        accion_usuario: 'Elimino un conclusion.',
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
    if (conclusion == null) return res.status(404).json({ message: `Conclusions nulos` })
    res.status(200).json(conclusion[1][0].dataValues)
}


function get(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}

module.exports = {
    getConclusionsCount,
    getConclusionsByLimitAndOffset,
    getConclusions,
    getConclusion,
    createConclusion,
    updateConclusion,
    deleteConclusion
}