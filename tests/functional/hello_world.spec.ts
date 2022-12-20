import { test } from '@japa/runner'

test.group('Cidades', () => {
  test('Autenticação requerida', async ({ client }) => {
    const response = await client.get('/api/cidade/1')

    response.assertStatus(401)
  })
  test('mostrar cidades', async ({ client }) => {
    const response = await client
      .get('/api/cidades?pageNumber=1&pageSize=2&sortDirection=asc&sortColumn=nom_cidade')
      .basicAuth('joellpaim', '123456')

    response.assertStatus(200)
  })

  test('mostrar cidade id 1', async ({ client }) => {
    const response = await client.get('/api/cidade/1').basicAuth('joellpaim', '123456')

    response.assertStatus(200)
    //console.log(response.body())
  })
})
