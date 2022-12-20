import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pais from 'App/Models/Pais'

export default class PaisController {
    public async store({ request, response }: HttpContextContract) {
        
      
       
        const body = request.body()

        const pais =  await Pais.create(body)

        response.status(201)

        return {
        message: `Pais criado com sucesso`,
        data: pais,
        }
             
        
    }

    public async index({request}: HttpContextContract) {
        
        const username = request.only(['username'])
        const password = request.only(['password'])

        const login = [ username, password]


        const paises = await Pais.all()

        return {
            data: [paises, login]
        }
    }

    public async show({params}: HttpContextContract) {
        const pais = await Pais.findOrFail(params.id_pais)

        return {
            data: pais,
        }
    }

    public async destroy({params}: HttpContextContract) {
        const pais = await Pais.findOrFail(params.id_pais)

        await pais.delete()

        return {
            message: "Pais excluido com sucesso!",
            data: pais,
        }
    }

    public async update ({params, request}: HttpContextContract) {

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
