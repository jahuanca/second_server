'use strict'
const models=require('../models')

async function getCamposCount(req,res){
  let [err,campos]=await get(models.Campo.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(campos==null) return res.status(404).json({message: `Campos nulos`})
  res.status(200).json(campos)
}

async function getCamposByLimitAndOffset(req,res){
  let [err,campos]=await get(models.Campo.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(campos==null) return res.status(404).json({message: `Campos nulos`})
  res.status(200).json(campos)
}

async function getCampos(req,res){
  let [err,campos]=await get(models.Campo.findAll({
    
    include: [{all: true}]
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(campos==null) return res.status(404).json({message: `Campos nulos`})
  let results={}
  results['results']= campos;
  let d={d: results}
  res.status(200).json(d)
}

async function getCampo(req,res){
  let [err,campo]=await get(models.Campo.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(campo==null) return res.status(404).json({message: `Campos nulos`})
  res.status(200).json(campo)
}

async function createCampo(req,res){
  let [err,campo]=await get(models.Campo.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo campo.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(campo==null) return res.status(404).json({message: `Campos nulos`})
  res.status(200).json(campo)
}


async function updateCampo(req,res){
  let [err,campo]=await get(models.Campo.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un campo.',
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
  if(campo==null) return res.status(404).json({message: `Campos nulos`})
  res.status(200).json(campo[1][0].dataValues)
}


async function deleteCampo(req,res){
  let [err,campo]=await get(models.Campo.update({
    estado: 'I',

    accion_usuario: 'Elimino un campo.',
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
  if(campo==null) return res.status(404).json({message: `Campos nulos`})
  res.status(200).json(campo[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getCamposCount,
  getCamposByLimitAndOffset,
  getCampos,
  getCampo,
  createCampo,
  updateCampo,
  deleteCampo
}