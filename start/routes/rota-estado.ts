import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/estados', 'EstadosController.index')
  Route.get('/estado/:id_estado', 'EstadosController.show')
  Route.post('/estado', 'EstadosController.store')
  Route.put('/estado/:id_estado', 'EstadosController.update')
  Route.delete('/estado/:id_estado', 'EstadosController.destroy')
})
  //.middleware('basic')
  .prefix('api')
