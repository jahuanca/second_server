'use strict'
const express=require('express')
const router=express.Router()
const campo=require('../controllers/campo')
/*const upload_controller=require('../controllers/upload_controller')
const auth=require('../middlewares/auth')*/

/**
 * @swagger
 * /Campo/:
 *  get:
 *    tags: [Campo]
 *    description: Obtiene todos los Campos.
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',campo.getCampos)
router.get('/count',campo.getCamposCount)
router.get('/range&limit=:limit?&offset=:offset',campo.getCamposByLimitAndOffset)
router.get('/id/:id',campo.getCampo)
router.post('/create',campo.createCampo)
router.put('/update',campo.updateCampo)
router.delete('/delete/:id', campo.deleteCampo)

module.exports=router
/** 
* @swagger
*definitions:
*  Campo:           
*    type: object
*    required:
*      - cod_Campo
*    properties:
*      cod_Campo:
*        type: integer
*/