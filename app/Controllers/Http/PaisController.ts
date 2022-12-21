import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pais from 'App/Models/Pais'

export default class PaisController {
    public async store({ auth, request, response }: HttpContextContract) {
        
        await auth.authenticate()
       
        const body = request.body()

        const pais =  await Pais.create(body)

        response.status(201)

        return {
        message: `Pais criado com sucesso`,
        data: pais,
        }        
        
    }

    public async index({ auth, request }: HttpContextContract) {

        await auth.authenticate()
        
        const username = request.only(['username'])
        const password = request.only(['password'])

        const login = [ username, password]


        const paises = await Pais.all()

        return {
            data: [paises, login]
        }
    }

    public async show({ auth, params }: HttpContextContract) {

        await auth.authenticate()

        const pais = await Pais.findOrFail(params.id_pais)

        return {
            data: pais,
        }
    }

    public async destroy({ auth, params }: HttpContextContract) {

        await auth.authenticate()

        const pais = await Pais.findOrFail(params.id_pais)

        await pais.delete()

        return {
            message: "Pais excluido com sucesso!",
            data: pais,
        }
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
