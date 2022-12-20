import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class App extends BaseModel {

  @column({ isPrimary: true })
  public id_app: number

  @column()
  public username: string
  
  @column({ serializeAs: null })
  public password: string

  @beforeSave()
  public static async hashPassword(app: App) {
    if (app.$dirty.password) {
      app.password = await Hash.make(app.password)
    }
  }
}
