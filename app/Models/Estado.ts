import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'

export default class Estado extends BaseModel {
  @column({ isPrimary: true })
  public id_estado: number

  @column()
  public nom_estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async validacoesEstado(estado: Estado){
  estado.nom_estado = estado.nom_estado.toUpperCase().trim()
  }

}
