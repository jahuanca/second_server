'use strict'
const express=require('express')
const router=express.Router()
const zpp_int=require('../controllers/zpp_int')

/**
 * @swagger
 * /Zpp_Int/:
 *  get:
 *    tags: [Zpp_Int]
 *    description: Obtiene todos los Zpp_Ints.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',zpp_int.getZpp_Ints)
router.get('/count',zpp_int.getZpp_IntsCount)
router.get('/range&limit=:limit?&offset=:offset',zpp_int.getZpp_IntsByLimitAndOffset)
router.get('/id/:id',zpp_int.getZpp_Int)
router.post('/create',zpp_int.createZpp_Int)
router.put('/update',zpp_int.updateZpp_Int)
router.delete('/delete/:id', zpp_int.deleteZpp_Int)

module.exports=router
/** 
* @swagger
*definitions:
*  Zpp_Int:           
*    type: object
*    required:
*      - cod_Zpp_Int
*    properties:
*      cod_Zpp_Int:
*        type: integer
*/ 