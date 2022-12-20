import { test } from '@japa/runner'

test.group('Cidades', () => {
  test('mostrar cidades', async ({ client }) => {
    const response = await client.get('/api/cidades')

    response.assertStatus(200)
    //response.assertBodyContains({ hello: 'world' })
  })

  test('mostrar cidade id 1', async ({ client }) => {
    const response = await client.get('/api/cidade/1')

    response.assertStatus(200)
    console.log(response.body())
  })
})
