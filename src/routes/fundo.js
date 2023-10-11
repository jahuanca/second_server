'use strict'
const express=require('express')
const router=express.Router()
const fundo=require('../controllers/fundo')

/**
 * @swagger
 * /Fundo/:
 *  get:
 *    tags: [Fundo]
 *    description: Obtiene todos los Fundos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',fundo.getFundos)
router.get('/count',fundo.getFundosCount)
router.get('/range&limit=:limit?&offset=:offset',fundo.getFundosByLimitAndOffset)
router.get('/id/:id',fundo.getFundo)
router.post('/create',fundo.createFundo)
router.put('/update',fundo.updateFundo)
router.delete('/delete/:id', fundo.deleteFundo)

module.exports=router
/** 
* @swagger
*definitions:
*  Fundo:           
*    type: object
*    required:
*      - cod_Fundo
*    properties:
*      cod_Fundo:
*        type: integer
*/