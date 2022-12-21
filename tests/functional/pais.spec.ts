import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Pais', () => {
  test('Autenticação requerida - Pais', async ({ client }) => {
    const response = await client.get('/api/pais/1')

    response.assertStatus(401)
  })

  test('Buscar todos os paises', async ({ client }) => {
    const response = await client.get('/api/paises').basicAuth('joellpaim', '123456')

    response.assertStatus(200)
  })

  test('Buscar pais id 1', async ({ client }) => {
    const response = await client.get('/api/pais/1').basicAuth('joellpaim', '123456')

    response.assertStatus(200)
    //console.log(response.body())
  })

  test('Salvar um pais Teste', async ({ client }) => {
    let payload = '{"nom_pais": "Teste"}'
    payload = JSON.parse(payload)

    const response = await client.post('/api/pais').basicAuth('joellpaim', '123456').json(payload)

    response.assertStatus(201)
    //console.log(response.body())
  })

  test('Atualizar um pais Teste', async ({ client }) => {
    let payload = '{"nom_pais": "Teste Atualizado"}'
    payload = JSON.parse(payload)

    const idPais = await Database.rawQuery('select id_pais from pais where nom_pais = ?', ['TESTE'])

    const response = await client
      .put(`/api/pais/${idPais.rows[0].id_pais}`)
      .basicAuth('joellpaim', '123456')
      .form(payload)

    //console.log(response.body())
    response.assertStatus(200)
  })

  test('Deletar o pais Teste', async ({ client }) => {
    let payload = '{"nom_pais": "Teste ATUALIZADO"}'
    payload = JSON.parse(payload)

    await client.post('/api/pais').basicAuth('joellpaim', '123456').json(payload)

    const idPais = await Database.rawQuery('select id_pais from pais where nom_pais = ?', [
      'TESTE ATUALIZADO',
    ])
    //console.log('Id da pais ', idPais.rows[0].id_pais)
    const response = await client
      .delete(`/api/pais/${idPais.rows[0].id_pais}`)
      .basicAuth('joellpaim', '123456')

    //console.log('Response: ', response.body())
    response.assertStatus(200)
  })
})
