import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'

export default class Pais extends BaseModel {
  @column({ isPrimary: true })
  public id_pais: number

  @column()
  public nom_pais: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async validacoesPais(pais: Pais){
  pais.nom_pais = pais.nom_pais.toUpperCase().trim()}
}
