import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/sessions', 'SessionsController.store')
})
  //.middleware('basic')
  .prefix('api')
