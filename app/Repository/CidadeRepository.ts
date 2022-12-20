import { CidadeIndexDTO } from 'App/Models/DTO/CidadeIndexDTO'
import Cidade from 'App/Models/Cidade'
import GenericResponseException from 'App/Exceptions/GenericResponseException'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'

export default class CidadeRepository {
  public async store(payload: Cidade): Promise<Cidade> {
    return await Cidade.create(payload).catch((erro) => {
      throw new GenericResponseException(erro.message, 500)
    })
  }

  public async index(data: CidadeIndexDTO): Promise<ModelPaginatorContract<Cidade>> {
    const query = Cidade.query().preload('estado').preload('pais')

    query.orderBy(data.sortColumn, data.sortDirection)
    return await query.paginate(data.pageNumber, data.pageSize).catch((erro) => {
      throw new GenericResponseException(erro.message, 500)
    })
  }

  public async destroy(id: number): Promise<number> {
    const cidade = await Cidade.findOrFail(id)

    await cidade.delete().catch((erro) => {
      throw new GenericResponseException(erro.message, 500)
    })

    return cidade.id_cidade
  }
}
