import EstadoIndexValidator, { EstadoIndexDTO } from 'App/Models/DTO/EstadoIndexDTO';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Estado from 'App/Models/Estado'
import EstadoRepository from 'App/Repository/EstadoRepository'
import EstadoValidator from 'App/Validators/EstadoValidator'

export default class EstadosController {

    private readonly _estadoRepository: EstadoRepository

    constructor() {
        this._estadoRepository = new EstadoRepository()
    }

    public async store({ auth, request, response }: HttpContextContract) {

        await auth.authenticate()

        /*
        const body = request.body()
 
        const estado =  await Estado.create(body)
 
        response.status(201)
 
        return {
         message: "Estado criado com sucesso",
         data: estado,
        }
        */

        const payload: Estado = await Object.assign(request.validate(EstadoValidator))
        return response.status(201).send(await this._estadoRepository.store(payload))
    }

    public async index({ auth, request, response }: HttpContextContract) {

        await auth.authenticate()

        /*
        const estados = await Estado.all()

        return {
            data: estados
        }
        */

        const payload: EstadoIndexDTO = await Object.assign(request.validate(EstadoIndexValidator))
        let resp = await this._estadoRepository.index(payload)
        return resp.length > 0 ? response.status(200).send(resp) : response.status(204)
    }

    public async show({ auth, params, response }: HttpContextContract) {

        await auth.authenticate()

        /*
        const estado = await Estado.findOrFail(params.id_estado)

        return {
            data: estado,
        }
        */

        return response.status(200).send(await Estado.findOrFail(params.id_estado))
    }

    public async destroy({ auth, params, response }: HttpContextContract) {

        await auth.authenticate()

        const estado = await Estado.findOrFail(params.id_estado)

        /*
        await estado.delete()

        return {
            message: "Estado excluido com sucesso!",
            data: estado,
        }
        */

        return response.status(200).send({ id: await this._estadoRepository.destroy(estado.id_estado) })
    }

    public async update ({ auth, params, request }: HttpContextContract) {
        
        await auth.authenticate()

        const body = request.body()

        const estado = await Estado.findOrFail(params.id_estado)
        
        estado.nom_estado = body.nom_estado

        await estado.save()

        return {
            message: "Estado atualizado com sucesso!",
            data: estado,
        }
    }
}
