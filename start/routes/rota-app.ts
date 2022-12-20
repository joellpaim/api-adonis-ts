import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/apps', 'AppsController.index')
  Route.get('/app/:id_app', 'AppsController.show')
  Route.post('/app', 'AppsController.store')
  Route.put('/app/:id_app', 'AppsController.update')
  Route.delete('/app/:id_app', 'AppsController.destroy')
})
  //.middleware('basic')
  .prefix('api')
