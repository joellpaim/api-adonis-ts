import PaisIndexValidator, { PaisIndexDTO } from 'App/Models/DTO/PaisIndexDTO';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pais from 'App/Models/Pais'
import PaisRepository from 'App/Repository/PaisRepository'
import PaisValidator from 'App/Validators/PaisValidator'

export default class PaisController {

    private readonly _paisRepository: PaisRepository

    constructor() {
        this._paisRepository = new PaisRepository()
    }

    public async store({ auth, request, response }: HttpContextContract) {
        
        await auth.authenticate()
       
        /*
        const body = request.body()

        const pais =  await Pais.create(body)

        response.status(201)

        return {
        message: `Pais criado com sucesso`,
        data: pais,
        } 
        */
       
        const payload: Pais = await Object.assign(request.validate(PaisValidator))
        return response.status(201).send(await this._paisRepository.store(payload))
        
    }

    public async index({ auth, request, response }: HttpContextContract) {

        await auth.authenticate()
                
        /*
        const paises = await Pais.all()

        return {
            data: [paises]
        }
        */

        const payload: PaisIndexDTO = await Object.assign(request.validate(PaisIndexValidator))
        let resp = await this._paisRepository.index(payload)
        return resp.length > 0 ? response.status(200).send(resp) : response.status(204)
    }

    public async show({ auth, params, response }: HttpContextContract) {

        await auth.authenticate()

        return response.status(200).send(await Pais.findOrFail(params.id_pais))
    }

    public async destroy({ auth, params, response }: HttpContextContract) {

        await auth.authenticate()

        const pais = await Pais.findOrFail(params.id_pais)

        return response.status(200).send({ id: await this._paisRepository.destroy(pais.id_pais) })
    }

    public async update ({ auth, params, request }: HttpContextContract) {

        await auth.authenticate()

        const body = request.body()

        const pais = await Pais.findOrFail(params.id_pais)
        
        pais.nom_pais = body.nom_pais

        await pais.save()

        return {
            message: "Pais atualizado com sucesso!",
            data: pais,
        }
    }
}
