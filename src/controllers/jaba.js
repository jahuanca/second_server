'use strict'
const models=require('../models')

async function getJabasCount(req,res){
  let [err,jabas]=await get(models.Jaba.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(jabas==null) return res.status(404).json({message: `Jabas nulos`})
  res.status(200).json(jabas)
}

async function getJabasByLimitAndOffset(req,res){
  let [err,jabas]=await get(models.Jaba.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(jabas==null) return res.status(404).json({message: `Jabas nulos`})
  res.status(200).json(jabas)
}

async function getJabas(req,res){
  let [err,jabas]=await get(models.Jaba.findAll({
    
    
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(jabas==null) return res.status(404).json({message: `Jabas nulos`})
  let results={}
  results['results']= jabas;
  let d={d: results}
  res.status(200).json(d)
}

async function getJaba(req,res){
  let [err,jaba]=await get(models.Jaba.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(jaba==null) return res.status(404).json({message: `Jabas nulos`})
  res.status(200).json(jaba)
}

async function createJaba(req,res){
  let [err,jaba]=await get(models.Jaba.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo jaba.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(jaba==null) return res.status(404).json({message: `Jabas nulos`})
  res.status(200).json(jaba)
}


async function updateJaba(req,res){
  let [err,jaba]=await get(models.Jaba.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un jaba.',
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
  if(jaba==null) return res.status(404).json({message: `Jabas nulos`})
  res.status(200).json(jaba[1][0].dataValues)
}


async function deleteJaba(req,res){
  let [err,jaba]=await get(models.Jaba.update({
    estado: 'I',

    accion_usuario: 'Elimino un jaba.',
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
  if(jaba==null) return res.status(404).json({message: `Jabas nulos`})
  res.status(200).json(jaba[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getJabasCount,
  getJabasByLimitAndOffset,
  getJabas,
  getJaba,
  createJaba,
  updateJaba,
  deleteJaba
}