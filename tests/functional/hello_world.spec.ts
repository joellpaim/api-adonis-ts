import { test } from '@japa/runner'

test.group('Cidades', () => {
  test('Autenticação requerida', async ({ client }) => {
    const response = await client.get('/api/cidade/1')

    response.assertStatus(401)
  })
  test('Buscar todas as cidades', async ({ client }) => {
    const response = await client
      .get('/api/cidades?pageNumber=1&pageSize=2&sortDirection=asc&sortColumn=nom_cidade')
      .basicAuth('joellpaim', '123456')

    response.assertStatus(200)
  })

  test('Buscar cidade id 1', async ({ client }) => {
    const response = await client.get('/api/cidade/1').basicAuth('joellpaim', '123456')

    response.assertStatus(200)
    //console.log(response.body())
  })

  test('Salvar uma cidade', async ({ client }) => {
    const payload = {
      nom_cidade: 'Nova Pádua',
      id_ibge: 6,
      id_estado: 1,
      id_pais: 1,
    }

    const response = await await client
      .post('/api/cidade')
      .basicAuth('joellpaim', '123456')
      .send(payload)

    response.assertStatus(200)
    //console.log(response.body())
  })
})
