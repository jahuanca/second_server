'use strict'
const models=require('../models')

async function getFormatosCount(req,res){
  let [err,formatos]=await get(models.Formato.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(formatos==null) return res.status(404).json({message: `Formatos nulos`})
  res.status(200).json(formatos)
}

async function getFormatosByLimitAndOffset(req,res){
  let [err,formatos]=await get(models.Formato.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(formatos==null) return res.status(404).json({message: `Formatos nulos`})
  res.status(200).json(formatos)
}

async function getFormatos(req,res){
  let [err,formatos]=await get(models.Formato.findAll({}))
  if(err) return res.status(500).json({message: `${err}`})
  if(formatos==null) return res.status(404).json({message: `Formatos nulos`})
  let results={}
  results['results']= formatos;
  let d={d: results}
  res.status(200).json(d)
}

async function getFormato(req,res){
  let [err,formato]=await get(models.Formato.findOne({
    
  }))
  
  if(err) return res.status(500).json({message: `${err}`})
  if(formato==null) return res.status(404).json({message: `Formatos nulos`})
  res.status(200).json(formato)
}

async function createFormato(req,res){
  let [err,formato]=await get(models.Formato.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo formato.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(formato==null) return res.status(404).json({message: `Formatos nulos`})
  res.status(200).json(formato)
}


async function updateFormato(req,res){
  let [err,formato]=await get(models.Formato.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un formato.',
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
  if(formato==null) return res.status(404).json({message: `Formatos nulos`})
  res.status(200).json(formato[1][0].dataValues)
}


async function deleteFormato(req,res){
  let [err,formato]=await get(models.Formato.update({
    estado: 'I',

    accion_usuario: 'Elimino un formato.',
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
  if(formato==null) return res.status(404).json({message: `Formatos nulos`})
  res.status(200).json(formato[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getFormatosCount,
  getFormatosByLimitAndOffset,
  getFormatos,
  getFormato,
  createFormato,
  updateFormato,
  deleteFormato
}