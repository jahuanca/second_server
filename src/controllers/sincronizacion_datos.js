const r=require('../services/request')
const rutas=require('./../rutas')
const models= require('./../models')

const headers={
    'accept': 'application/json',
    'content-type': 'application/json',
    'x-csrf-token': 'Fetch',
    //'Authorization': authorizations[mandanteNow].
}

async function sendMaterial(){
    try {
        let [errorMaterial, materials]= await get(models.Zpp_Int.findAll({

        }));
        if(errorMaterial) new Error("No pudo encontrar el material");
        let resultMaterial=await r.get(rutas.RUTA_MATERIAL, headers)
        if(isSuccess(resultMaterial)){
            headers['x-csrf-token'] = resultMaterial.response.headers['x-csrf-token'];
            headers['cookie'] = resultMaterial.response.headers['set-cookie'].split(',').last;

            let resultPost=await r.post(rutas.RUTA_MATERIAL, materials , headers)

            for (let i = 0; i < materials.length; i++) {
                const e = materials[i];
                let [errorUpdateMaterial, update]= await get(models.Zpp_Int.update({
                    estado: 'MIGRADO A NUEVO SERVIDOR'
                }, {
                    where: {id: e.id}
                }))
            }
        }
    } catch (error) {
        
    }
}

function isSuccess(result){
    return (result.response.statusCode>= 200 && result.response.statusCode <= 299);
}

function get(promise) {
    return promise.then(data => {
        return [null, data];
    })
        .catch(err => [err]);
}