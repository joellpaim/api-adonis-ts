import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EstadoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nom_estado: schema.string({}, [
      rules.trim(), // Remove spaces em ambos os lados da string
      rules.required(),
      rules.maxLength(60), // O Maior nome de cidade do mundo tem 58 caracteres
      rules.minLength(3),
    ]),
  })

  public messages: CustomMessages = {
    required: 'É necessário preencher o campo: {{ field }}',
    minLength: 'Informe no minimo três caracteres',
    maxLength: 'O maximo é de quinhentos caracteres',
  }
}
