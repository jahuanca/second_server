'use strict'
const express=require('express')
const router=express.Router()
const variedad=require('../controllers/variedad')

/**
 * @swagger
 * /Variedad/:
 *  get:
 *    tags: [Variedad]
 *    description: Obtiene todos los Variedads.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',variedad.getVariedads)
router.get('/count',variedad.getVariedadsCount)
router.get('/range&limit=:limit?&offset=:offset',variedad.getVariedadsByLimitAndOffset)
router.get('/id/:id',variedad.getVariedad)
router.post('/create',variedad.createVariedad)
router.put('/update',variedad.updateVariedad)
router.delete('/delete/:id', variedad.deleteVariedad)

module.exports=router
/** 
* @swagger
*definitions:
*  Variedad:           
*    type: object
*    required:
*      - cod_Variedad
*    properties:
*      cod_Variedad:
*        type: integer
*/