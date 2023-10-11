'use strict'
const express=require('express')
const router=express.Router()
const jaba=require('../controllers/jaba')

/**
 * @swagger
 * /Jaba/:
 *  get:
 *    tags: [Jaba]
 *    description: Obtiene todos los Jabas.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',jaba.getJabas)
router.get('/count',jaba.getJabasCount)
router.get('/range&limit=:limit?&offset=:offset',jaba.getJabasByLimitAndOffset)
router.get('/id/:id',jaba.getJaba)
router.post('/create',jaba.createJaba)
router.put('/update',jaba.updateJaba)
router.delete('/delete/:id', jaba.deleteJaba)

module.exports=router
/** 
* @swagger
*definitions:
*  Jaba:           
*    type: object
*    required:
*      - cod_Jaba
*    properties:
*      cod_Jaba:
*        type: integer
*/