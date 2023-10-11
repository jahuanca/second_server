'use strict'
const models=require('../models')

async function getDestinosCount(req,res){
  let [err,destinos]=await get(models.Destino.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(destinos==null) return res.status(404).json({message: `Destinos nulos`})
  res.status(200).json(destinos)
}

async function getDestinosByLimitAndOffset(req,res){
  let [err,destinos]=await get(models.Destino.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(destinos==null) return res.status(404).json({message: `Destinos nulos`})
  res.status(200).json(destinos)
}

async function getDestinos(req,res){
  let [err,destinos]=await get(models.Destino.findAll({
    
    
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(destinos==null) return res.status(404).json({message: `Destinos nulos`})
  let results={}
  results['results']= destinos;
  let d={d: results}
  res.status(200).json(d)
}

async function getDestino(req,res){
  let [err,destino]=await get(models.Destino.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(destino==null) return res.status(404).json({message: `Destinos nulos`})
  res.status(200).json(destino)
}

async function createDestino(req,res){
  let [err,destino]=await get(models.Destino.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo destino.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(destino==null) return res.status(404).json({message: `Destinos nulos`})
  res.status(200).json(destino)
}


async function updateDestino(req,res){
  let [err,destino]=await get(models.Destino.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un destino.',
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
  if(destino==null) return res.status(404).json({message: `Destinos nulos`})
  res.status(200).json(destino[1][0].dataValues)
}


async function deleteDestino(req,res){
  let [err,destino]=await get(models.Destino.update({
    estado: 'I',

    accion_usuario: 'Elimino un destino.',
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
  if(destino==null) return res.status(404).json({message: `Destinos nulos`})
  res.status(200).json(destino[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getDestinosCount,
  getDestinosByLimitAndOffset,
  getDestinos,
  getDestino,
  createDestino,
  updateDestino,
  deleteDestino
}