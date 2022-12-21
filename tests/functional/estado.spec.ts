import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Estado', () => {
  test('Autenticação requerida - Estado', async ({ client }) => {
    const response = await client.get('/api/estado/1')

    response.assertStatus(401)
  })

  test('Buscar todos os estados', async ({ client }) => {
    const response = await client.get('/api/estados').basicAuth('joellpaim', '123456')

    response.assertStatus(200)
  })

  test('Buscar estado id 1', async ({ client }) => {
    const response = await client.get('/api/estado/1').basicAuth('joellpaim', '123456')

    response.assertStatus(200)
    //console.log(response.body())
  })

  test('Salvar um estado Teste', async ({ client }) => {
    let payload = '{"nom_estado": "Teste"}'
    payload = JSON.parse(payload)

    const response = await client.post('/api/estado').basicAuth('joellpaim', '123456').json(payload)

    response.assertStatus(201)
    //console.log(response.body())
  })

  test('Atualizar um estado Teste', async ({ client }) => {
    let payload = '{"nom_estado": "Teste Atualizado"}'
    payload = JSON.parse(payload)

    const idestado = await Database.rawQuery('select id_estado from estados where nom_estado = ?', [
      'TESTE',
    ])

    const response = await client
      .put(`/api/estado/${idestado.rows[0].id_estado}`)
      .basicAuth('joellpaim', '123456')
      .form(payload)

    //console.log(response.body())
    response.assertStatus(200)
  })

  test('Deletar o estado Teste', async ({ client }) => {
    let payload = '{"nom_estado": "Teste ATUALIZADO"}'
    payload = JSON.parse(payload)

    await client.post('/api/estado').basicAuth('joellpaim', '123456').json(payload)

    const idEstado = await Database.rawQuery('select id_estado from estados where nom_estado = ?', [
      'TESTE ATUALIZADO',
    ])
    //console.log('Id da estado ', idEstado.rows[0].id_estado)
    const response = await client
      .delete(`/api/estado/${idEstado.rows[0].id_estado}`)
      .basicAuth('joellpaim', '123456')

    //console.log('Response: ', response.body())
    response.assertStatus(200)
  })
})
