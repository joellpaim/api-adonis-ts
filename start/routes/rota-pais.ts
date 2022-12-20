import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/paises', 'PaisController.index')
  Route.get('/pais/:id_pais', 'PaisController.show')
  Route.post('/pais', 'PaisController.store')
  Route.put('/pais/:id_pais', 'PaisController.update')
  Route.delete('/pais/:id_pais', 'PaisController.destroy')
})
  .prefix('api')
  //.middleware('basic')
