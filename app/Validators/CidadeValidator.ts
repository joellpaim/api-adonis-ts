import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CidadeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_cidade: schema.number(),
    nom_cidade: schema.string({}, [
      rules.trim(), // Remove spaces em ambos os lados da string
      rules.required(),
      rules.maxLength(60), // O Maior nome de cidade do mundo tem 58 caracteres
      rules.minLength(3),
    ]),
    id_ibge: schema.number([rules.required()]),
    id_estado: schema.number([rules.required()]),
    id_pais: schema.number([rules.required()]),
  })

  public messages: CustomMessages = {
    required: 'É necessário preencher o campo: {{ field }}',
    minLength: 'Informe no minimo três caracteres',
    maxLength: 'O maximo é de quinhentos caracteres',
  }
}
