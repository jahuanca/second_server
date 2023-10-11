'use strict'
const models=require('../models')

async function getFundosCount(req,res){
  let [err,fundos]=await get(models.Fundo.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(fundos==null) return res.status(404).json({message: `Fundos nulos`})
  res.status(200).json(fundos)
}

async function getFundosByLimitAndOffset(req,res){
  let [err,fundos]=await get(models.Fundo.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(fundos==null) return res.status(404).json({message: `Fundos nulos`})
  res.status(200).json(fundos)
}

async function getFundos(req,res){
  let [err,fundos]=await get(models.Fundo.findAll({
    
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(fundos==null) return res.status(404).json({message: `Fundos nulos`})
  let results={}
  results['results']= fundos;
  let d={d: results}
  res.status(200).json(d)
}

async function getFundo(req,res){
  let [err,fundo]=await get(models.Fundo.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(fundo==null) return res.status(404).json({message: `Fundos nulos`})
  res.status(200).json(fundo)
}

async function createFundo(req,res){
  let [err,fundo]=await get(models.Fundo.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo fundo.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(fundo==null) return res.status(404).json({message: `Fundos nulos`})
  res.status(200).json(fundo)
}


async function updateFundo(req,res){
  let [err,fundo]=await get(models.Fundo.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un fundo.',
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
  if(fundo==null) return res.status(404).json({message: `Fundos nulos`})
  res.status(200).json(fundo[1][0].dataValues)
}


async function deleteFundo(req,res){
  let [err,fundo]=await get(models.Fundo.update({
    estado: 'I',

    accion_usuario: 'Elimino un fundo.',
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
  if(fundo==null) return res.status(404).json({message: `Fundos nulos`})
  res.status(200).json(fundo[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getFundosCount,
  getFundosByLimitAndOffset,
  getFundos,
  getFundo,
  createFundo,
  updateFundo,
  deleteFundo
}