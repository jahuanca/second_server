'use strict'
const models=require('../models')

async function getEtiquetasCount(req,res){
  let [err,etiquetas]=await get(models.Etiqueta.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(etiquetas==null) return res.status(404).json({message: `Etiquetas nulos`})
  res.status(200).json(etiquetas)
}

async function getEtiquetasByLimitAndOffset(req,res){
  let [err,etiquetas]=await get(models.Etiqueta.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(etiquetas==null) return res.status(404).json({message: `Etiquetas nulos`})
  res.status(200).json(etiquetas)
}

async function getEtiquetas(req,res){
  let [err,etiquetas]=await get(models.Etiqueta.findAll({
    
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(etiquetas==null) return res.status(404).json({message: `Etiquetas nulos`})
  let results={}
  results['results']= etiquetas;
  let d={d: results}
  res.status(200).json(d)
}

async function getEtiqueta(req,res){
  let [err,etiqueta]=await get(models.Etiqueta.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(etiqueta==null) return res.status(404).json({message: `Etiquetas nulos`})
  res.status(200).json(etiqueta)
}

async function createEtiqueta(req,res){
  let [err,etiqueta]=await get(models.Etiqueta.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo etiqueta.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(etiqueta==null) return res.status(404).json({message: `Etiquetas nulos`})
  res.status(200).json(etiqueta)
}


async function updateEtiqueta(req,res){
  let [err,etiqueta]=await get(models.Etiqueta.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un etiqueta.',
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
  if(etiqueta==null) return res.status(404).json({message: `Etiquetas nulos`})
  res.status(200).json(etiqueta[1][0].dataValues)
}


async function deleteEtiqueta(req,res){
  let [err,etiqueta]=await get(models.Etiqueta.update({
    estado: 'I',

    accion_usuario: 'Elimino un etiqueta.',
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
  if(etiqueta==null) return res.status(404).json({message: `Etiquetas nulos`})
  res.status(200).json(etiqueta[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getEtiquetasCount,
  getEtiquetasByLimitAndOffset,
  getEtiquetas,
  getEtiqueta,
  createEtiqueta,
  updateEtiqueta,
  deleteEtiqueta
}