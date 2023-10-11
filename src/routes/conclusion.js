'use strict'
const express=require('express')
const router=express.Router()
const conclusion=require('../controllers/conclusion')

/**
 * @swagger
 * /Conclusion/:
 *  get:
 *    tags: [Conclusion]
 *    description: Obtiene todos los Conclusions.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',conclusion.getConclusions)
router.get('/count',conclusion.getConclusionsCount)
router.get('/range&limit=:limit?&offset=:offset',conclusion.getConclusionsByLimitAndOffset)
router.get('/id/:id',conclusion.getConclusion)
router.post('/create',conclusion.createConclusion)
router.put('/update',conclusion.updateConclusion)
router.delete('/delete/:id', conclusion.deleteConclusion)

module.exports=router
/** 
* @swagger
*definitions:
*  Conclusion:           
*    type: object
*    required:
*      - cod_Conclusion
*    properties:
*      cod_Conclusion:
*        type: integer
*/