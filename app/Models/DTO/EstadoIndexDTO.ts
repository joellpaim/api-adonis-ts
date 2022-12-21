import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import Estado from 'App/Models/Estado'

export default class EstadoIndexValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    props: Estado.$hasColumn(this.ctx.request.only(['sortColumn']).sortColumn)
      ? this.ctx.request.only(['sortColumn']).sortColumn
      : '',
  })

  public schema = schema.create({
    nom_estado: schema.string.optional(),
    pageNumber: schema.number([rules.unsigned(), rules.range(1, 1000)]),
    pageSize: schema.number(),
    sortColumn: schema.string([rules.equalTo(this.refs.props)]),
    sortDirection: schema.enum(['asc', 'desc'] as const),
  })

  public messages: CustomMessages = {
    required: 'É necessário preencher o campo: {{ field }}',
    equalTo: 'Valor inválido, verifique. campo: {{ field }}',
  }
}
