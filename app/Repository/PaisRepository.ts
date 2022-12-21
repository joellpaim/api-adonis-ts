import { PaisIndexDTO } from 'App/Models/DTO/PaisIndexDTO'
import Pais from 'App/Models/Pais'
import GenericResponseException from 'App/Exceptions/GenericResponseException'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'

export default class PaisRepository {
  public async store(payload: Pais): Promise<Pais> {
    return await Pais.create(payload).catch((erro) => {
      throw new GenericResponseException(erro.message, 500)
    })
  }

  public async index(data: PaisIndexDTO): Promise<ModelPaginatorContract<Pais>> {
    const query = Pais.query()

    query.orderBy(data.sortColumn, data.sortDirection)
    return await query.paginate(data.pageNumber, data.pageSize).catch((erro) => {
      throw new GenericResponseException(erro.message, 500)
    })
  }

  public async destroy(id: number): Promise<number> {
    const pais = await Pais.findOrFail(id)

    await pais.delete().catch((erro) => {
      throw new GenericResponseException(erro.message, 500)
    })

    return pais.id_pais
  }
}
