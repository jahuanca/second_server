'use strict'
const models=require('../models')

async function getTrazabilidadsCount(req,res){
  let [err,trazabilidads]=await get(models.Trazabilidad.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `err`})
  if(trazabilidads==null) return res.status(404).json({message: `Trazabilidads nulos`})
  res.status(200).json(trazabilidads)
}

async function getTrazabilidadsByLimitAndOffset(req,res){
  let [err,trazabilidads]=await get(models.Trazabilidad.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `err`})
  if(trazabilidads==null) return res.status(404).json({message: `Trazabilidads nulos`})
  res.status(200).json(trazabilidads)
}

async function getTrazabilidads(req,res){
  let [err,trazabilidads]=await get(models.Trazabilidad.findAll({
    
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(trazabilidads==null) return res.status(404).json({message: `Trazabilidads nulos`})
  let results={}
  results['results']= trazabilidads;
  let d={d: results}
  res.status(200).json(d)
}

async function getTrazabilidad(req,res){
  let [err,trazabilidad]=await get(models.Trazabilidad.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `err`})
  if(trazabilidad==null) return res.status(404).json({message: `Trazabilidads nulos`})
  res.status(200).json(trazabilidad)
}

async function createTrazabilidad(req,res){
  let [err,trazabilidad]=await get(models.Trazabilidad.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo trazabilidad.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `err`})
  if(trazabilidad==null) return res.status(404).json({message: `Trazabilidads nulos`})
  res.status(200).json(trazabilidad)
}


async function updateTrazabilidad(req,res){
  let [err,trazabilidad]=await get(models.Trazabilidad.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un trazabilidad.',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.body.id, estado:'A'
    },
    individualHooks: true,
    validate: false
  }))
  if(err) return res.status(500).json({message: `err`})
  if(trazabilidad==null) return res.status(404).json({message: `Trazabilidads nulos`})
  res.status(200).json(trazabilidad[1][0].dataValues)
}


async function deleteTrazabilidad(req,res){
  let [err,trazabilidad]=await get(models.Trazabilidad.update({
    estado: 'I',

    accion_usuario: 'Elimino un trazabilidad.',
    accion: 'D',
    ip: req.ip,
    usuario: 0
  },{
    where:{
      id: req.params.id, estado:'A'
    },
    individualHooks: true
  }))
  if(err) return res.status(500).json({message: `err`})
  if(trazabilidad==null) return res.status(404).json({message: `Trazabilidads nulos`})
  res.status(200).json(trazabilidad[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTrazabilidadsCount,
  getTrazabilidadsByLimitAndOffset,
  getTrazabilidads,
  getTrazabilidad,
  createTrazabilidad,
  updateTrazabilidad,
  deleteTrazabilidad
}