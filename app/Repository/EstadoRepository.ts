import { EstadoIndexDTO } from 'App/Models/DTO/EstadoIndexDTO'
import Estado from 'App/Models/Estado'
import GenericResponseException from 'App/Exceptions/GenericResponseException'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'

export default class EstadoRepository {
  public async store(payload: Estado): Promise<Estado> {
    return await Estado.create(payload).catch((erro) => {
      throw new GenericResponseException(erro.message, 500)
    })
  }

  public async index(data: EstadoIndexDTO): Promise<ModelPaginatorContract<Estado>> {
    const query = Estado.query()

    query.orderBy(data.sortColumn, data.sortDirection)
    return await query.paginate(data.pageNumber, data.pageSize).catch((erro) => {
      throw new GenericResponseException(erro.message, 500)
    })
  }

  public async destroy(id: number): Promise<number> {
    const estado = await Estado.findOrFail(id)

    await estado.delete().catch((erro) => {
      throw new GenericResponseException(erro.message, 500)
    })

    return estado.id_estado
  }
}
