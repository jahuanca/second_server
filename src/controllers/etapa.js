'use strict'
const models=require('../models')

async function getEtapasCount(req,res){
  let [err,etapas]=await get(models.Etapa.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(etapas==null) return res.status(404).json({message: `Etapas nulos`})
  res.status(200).json(etapas)
}

async function getEtapasByLimitAndOffset(req,res){
  let [err,etapas]=await get(models.Etapa.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(etapas==null) return res.status(404).json({message: `Etapas nulos`})
  res.status(200).json(etapas)
}

async function getEtapas(req,res){
  let [err,etapas]=await get(models.Etapa.findAll({
    
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(etapas==null) return res.status(404).json({message: `Etapas nulos`})
  let results={}
  results['results']= etapas;
  let d={d: results}
  res.status(200).json(d)
}

async function getEtapa(req,res){
  let [err,etapa]=await get(models.Etapa.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(etapa==null) return res.status(404).json({message: `Etapas nulos`})
  res.status(200).json(etapa)
}

async function createEtapa(req,res){
  let [err,etapa]=await get(models.Etapa.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo etapa.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(etapa==null) return res.status(404).json({message: `Etapas nulos`})
  res.status(200).json(etapa)
}


async function updateEtapa(req,res){
  let [err,etapa]=await get(models.Etapa.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un etapa.',
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
  if(etapa==null) return res.status(404).json({message: `Etapas nulos`})
  res.status(200).json(etapa[1][0].dataValues)
}


async function deleteEtapa(req,res){
  let [err,etapa]=await get(models.Etapa.update({
    estado: 'I',

    accion_usuario: 'Elimino un etapa.',
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
  if(etapa==null) return res.status(404).json({message: `Etapas nulos`})
  res.status(200).json(etapa[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getEtapasCount,
  getEtapasByLimitAndOffset,
  getEtapas,
  getEtapa,
  createEtapa,
  updateEtapa,
  deleteEtapa
}