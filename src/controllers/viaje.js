'use strict'
const models=require('../models')

async function getViajesCount(req,res){
  let [err,viajes]=await get(models.Viaje.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(viajes==null) return res.status(404).json({message: `Viajes nulos`})
  res.status(200).json(viajes)
}

async function getLastViaje(req,res){
    let results={}
    results['results']= [{
        'codviaje': 0
    }];
    let d={d: results}
    res.status(200).json(d)
  }

async function getViajesByLimitAndOffset(req,res){
  let [err,viajes]=await get(models.Viaje.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(viajes==null) return res.status(404).json({message: `Viajes nulos`})
  res.status(200).json(viajes)
}

async function getViajes(req,res){
  let [err,viajes]=await get(models.Viaje.findAll({
    where:{estado: 'A'},
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(viajes==null) return res.status(404).json({message: `Viajes nulos`})
  res.status(200).json(viajes)
}

async function getViaje(req,res){
  let [err,viaje]=await get(models.Viaje.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(viaje==null) return res.status(404).json({message: `Viajes nulos`})
  res.status(200).json(viaje)
}

async function createViaje(req,res){
  let [err,viaje]=await get(models.Viaje.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo viaje.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(viaje==null) return res.status(404).json({message: `Viajes nulos`})
  res.status(200).json(viaje)
}


async function updateViaje(req,res){
  let [err,viaje]=await get(models.Viaje.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un viaje.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(viaje==null) return res.status(404).json({message: `Viajes nulos`})
  res.status(200).json(viaje[1][0].dataValues)
}


async function deleteViaje(req,res){
  let [err,viaje]=await get(models.Viaje.update({
    estado: 'I',

    accion_usuario: 'Elimino un viaje.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(viaje==null) return res.status(404).json({message: `Viajes nulos`})
  res.status(200).json(viaje[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getViajesCount,
  getViajesByLimitAndOffset,
  getViajes,
  getLastViaje,
  getViaje,
  createViaje,
  updateViaje,
  deleteViaje
}