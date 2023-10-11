'use strict'
const models=require('../models')

async function getVariedadsCount(req,res){
  let [err,variedads]=await get(models.Variedad.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(variedads==null) return res.status(404).json({message: `Variedads nulos`})
  res.status(200).json(variedads)
}

async function getVariedadsByLimitAndOffset(req,res){
  let [err,variedads]=await get(models.Variedad.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(variedads==null) return res.status(404).json({message: `Variedads nulos`})
  res.status(200).json(variedads)
}

async function getVariedads(req,res){
  let [err,variedads]=await get(models.Variedad.findAll({
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(variedads==null) return res.status(404).json({message: `Variedads nulos`})
  let results={}
  results['results']= variedads;
  let d={d: results}
  res.status(200).json(d)
}

async function getVariedad(req,res){
  let [err,variedad]=await get(models.Variedad.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(variedad==null) return res.status(404).json({message: `Variedads nulos`})
  res.status(200).json(variedad)
}

async function createVariedad(req,res){
  let [err,variedad]=await get(models.Variedad.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo variedad.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(variedad==null) return res.status(404).json({message: `Variedads nulos`})
  res.status(200).json(variedad)
}


async function updateVariedad(req,res){
  let [err,variedad]=await get(models.Variedad.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un variedad.',
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
  if(variedad==null) return res.status(404).json({message: `Variedads nulos`})
  res.status(200).json(variedad[1][0].dataValues)
}


async function deleteVariedad(req,res){
  let [err,variedad]=await get(models.Variedad.update({
    estado: 'I',

    accion_usuario: 'Elimino un variedad.',
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
  if(variedad==null) return res.status(404).json({message: `Variedads nulos`})
  res.status(200).json(variedad[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getVariedadsCount,
  getVariedadsByLimitAndOffset,
  getVariedads,
  getVariedad,
  createVariedad,
  updateVariedad,
  deleteVariedad
}