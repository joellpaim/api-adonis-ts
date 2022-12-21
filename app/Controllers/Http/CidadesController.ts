import IndexValidator, { CidadeIndexDTO } from 'App/Models/DTO/CidadeIndexDTO';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cidade from 'App/Models/Cidade'
import CidadeRepository from 'App/Repository/CidadeRepository'
import CidadeValidator from 'App/Validators/CidadeValidator'

export default class CidadesController {
    private readonly _cidadeRepository: CidadeRepository

    constructor() {
        this._cidadeRepository = new CidadeRepository()
    }
    public async store({ request, response, auth }: HttpContextContract) {
        
        /*
        const body = request.body()
        const estado = await Estado.findOrFail(params.id_estado)
        body.id_estado = estado.id_estado
        const pais = await Pais.findOrFail(params.id_pais)
        body.id_pais = pais.id_pais

       const cidade =  await Cidade.create(body)
       

       response.status(201)

       return {
        message: "Cidade criada com sucesso",
        data: cidade,
       } */
       await auth.authenticate()
       
       const payload: Cidade = await Object.assign(request.validate(CidadeValidator))
       return response.status(201).send(await this._cidadeRepository.store(payload))
    }

    public async index({ request, response, auth }: HttpContextContract) {
        // Fazer service fora do controller

        await auth.authenticate()

        const payload: CidadeIndexDTO = await Object.assign(request.validate(IndexValidator))
        let resp = await this._cidadeRepository.index(payload)
        return resp.length > 0 ? response.status(200).send(resp) : response.status(204)
        /*

        const limit = 20

        const page = request.input('page', 1)

        return Database
            .from('cidades')
            .select('*')
            .orderBy('id_cidade', 'asc')
            .paginate(page, limit) */
    }

    public async show({auth, params, response}: HttpContextContract) {
        /*
        const cidade = await Cidade.findOrFail(params.id_cidade)
        const estado = await Estado.findOrFail(cidade.id_estado)
        const pais = await Pais.findOrFail(cidade.id_pais)

        const info = [cidade, estado, pais]

        return {
            data: info,
        } */

        await auth.authenticate()

        return response.status(200).send(await Cidade.findOrFail(params.id_cidade))
    }

    public async destroy({auth, response, params}: HttpContextContract) {
        /*
        const cidade = await Cidade.findOrFail(params.id_cidade)

        await cidade.delete()

        return {
            message: "Cidade excluida com sucesso!",
            data: cidade,
        }
        */
        await auth.authenticate()

        const cidade = await Cidade.findOrFail(params.id_cidade)
        
        return response.status(200).send({ id: await this._cidadeRepository.destroy(cidade.id_cidade) })
    }

    public async update ({auth, params, request}: HttpContextContract) {
        
        await auth.authenticate()

        const body = request.body()

        const cidade = await Cidade.findOrFail(params.id_cidade)
        
        cidade.nom_cidade = body.nom_cidade

        await cidade.save()

        return {
            message: "Cidade atualizada com sucesso!",
            data: cidade,
        }
    }
}
