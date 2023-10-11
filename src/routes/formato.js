'use strict'
const express=require('express')
const router=express.Router()
const formato=require('../controllers/formato')

/**
 * @swagger
 * /Formato/:
 *  get:
 *    tags: [Formato]
 *    description: Obtiene todos los Formatos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',formato.getFormatos)
router.get('/count',formato.getFormatosCount)
router.get('/range&limit=:limit?&offset=:offset',formato.getFormatosByLimitAndOffset)
router.get('/id/:id',formato.getFormato)
router.post('/create',formato.createFormato)
router.put('/update',formato.updateFormato)
router.delete('/delete/:id', formato.deleteFormato)

module.exports=router
/** 
* @swagger
*definitions:
*  Formato:           
*    type: object
*    required:
*      - cod_Formato
*    properties:
*      cod_Formato:
*        type: integer
*/