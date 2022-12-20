import Estado from './Estado';
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Pais from './Pais';

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  public id_cidade: number

  @column()
  public nom_cidade: string

  @column()
  public id_ibge: number

  @column()
  public id_pais: number

  @column()
  public id_estado: number

  @belongsTo(() => Pais, {foreignKey: 'id_pais'})
  public pais: BelongsTo<typeof Pais>

  @belongsTo(() => Estado, {foreignKey: 'id_estado'})
  public estado: BelongsTo<typeof Estado>  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async validacoesCidade(cidade: Cidade){
  cidade.nom_cidade = cidade.nom_cidade.toUpperCase().trim()}
}
