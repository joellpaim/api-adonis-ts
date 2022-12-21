import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Cidades', () => {
  test('Autenticação requerida - Cidade', async ({ client }) => {
    const response = await client.get('/api/cidade/1')

    response.assertStatus(401)
  })

  test('Buscar todas as cidades', async ({ client }) => {
    const response = await client
      .get('/api/cidades?pageNumber=1&pageSize=2&sortDirection=asc&sortColumn=nom_cidade')
      .basicAuth('joellpaim', '123456')

    response.assertStatus(200)
  })

  test('Buscar cidade id 2', async ({ client }) => {
    const response = await client.get('/api/cidade/2').basicAuth('joellpaim', '123456')

    response.assertStatus(200)
    //console.log(response.body())
  })

  test('Salvar uma cidade Teste', async ({ client }) => {
    let payload = '{"nom_cidade": "Teste", "id_ibge": 555, "id_estado": 1, "id_pais": 1}'
    payload = JSON.parse(payload)

    const response = await client.post('/api/cidade').basicAuth('joellpaim', '123456').json(payload)

    response.assertStatus(201)
    //console.log(response.body())
  })

  test('Atualizar uma cidade Teste', async ({ client }) => {
    let payload = '{"nom_cidade": "Teste Atualizada", "id_ibge": 6, "id_estado": 1, "id_pais": 1}'
    payload = JSON.parse(payload)

    const idCidade = await Database.rawQuery('select id_cidade from cidades where nom_cidade = ?', [
      'TESTE',
    ])

    const response = await client
      .put(`/api/cidade/${idCidade.rows[0].id_cidade}`)
      .basicAuth('joellpaim', '123456')
      .form(payload)

    //console.log(response.body())
    response.assertStatus(200)
  })

  test('Deletar a cidade Teste', async ({ client }) => {
    let payload = '{"nom_cidade": "Teste", "id_ibge": 777, "id_estado": 1, "id_pais": 1}'
    payload = JSON.parse(payload)

    await client.post('/api/cidade').basicAuth('joellpaim', '123456').json(payload)

    const idCidade = await Database.rawQuery('select id_cidade from cidades where nom_cidade = ?', [
      'TESTE',
    ])
    //console.log('Id da cidade ', idCidade.rows[0].id_cidade)
    const response = await client
      .delete(`/api/cidade/${idCidade.rows[0].id_cidade}`)
      .basicAuth('joellpaim', '123456')

    //console.log('Response: ', response.body())
    response.assertStatus(200)
  })
})
