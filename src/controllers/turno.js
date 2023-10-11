'use strict'
const models=require('../models')

async function getTurnosCount(req,res){
  let [err,turnos]=await get(models.Turno.count({
    where:{estado: 'A'},
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(turnos==null) return res.status(404).json({message: `Turnos nulos`})
  res.status(200).json(turnos)
}

async function getTurnosByLimitAndOffset(req,res){
  let [err,turnos]=await get(models.Turno.findAll({
    where:{estado: 'A'},
    offset: req.params.offset ? parseInt(req.params.offset) : 0,
    limit: req.params.limit ? parseInt(req.params.limit) : 10,
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(turnos==null) return res.status(404).json({message: `Turnos nulos`})
  res.status(200).json(turnos)
}

async function getTurnos(req,res){
  let [err,turnos]=await get(models.Turno.findAll({
    
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(turnos==null) return res.status(404).json({message: `Turnos nulos`})
  let results={}
  results['results']= turnos;
  let d={d: results}
  res.status(200).json(d)
}

async function getTurno(req,res){
  let [err,turno]=await get(models.Turno.findOne({
    where:{id: req.params.id, estado: 'A'},
    include: [{all: true}]
  }))
  console.log(err)
  if(err) return res.status(500).json({message: `${err}`})
  if(turno==null) return res.status(404).json({message: `Turnos nulos`})
  res.status(200).json(turno)
}

async function createTurno(req,res){
  let [err,turno]=await get(models.Turno.create({
       //all fields to insert
      
      accion: 'I',
      accion_usuario: 'Creo un nuevo turno.',
      ip: req.ip,
      usuario: 0
  }))
  if(err) return res.status(500).json({message: `${err}`})
  if(turno==null) return res.status(404).json({message: `Turnos nulos`})
  res.status(200).json(turno)
}


async function updateTurno(req,res){
  let [err,turno]=await get(models.Turno.update({
    //all fields to update
    
    accion: 'U',
    accion_usuario: 'Edito un turno.',
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
  if(turno==null) return res.status(404).json({message: `Turnos nulos`})
  res.status(200).json(turno[1][0].dataValues)
}


async function deleteTurno(req,res){
  let [err,turno]=await get(models.Turno.update({
    estado: 'I',

    accion_usuario: 'Elimino un turno.',
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
  if(turno==null) return res.status(404).json({message: `Turnos nulos`})
  res.status(200).json(turno[1][0].dataValues)
}


function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}

module.exports={
  getTurnosCount,
  getTurnosByLimitAndOffset,
  getTurnos,
  getTurno,
  createTurno,
  updateTurno,
  deleteTurno
}