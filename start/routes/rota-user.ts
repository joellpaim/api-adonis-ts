import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.get('/user/:id', 'UsersController.show')
  Route.post('/user', 'UsersController.store')
  Route.put('/user/:id', 'UsersController.update')
  Route.delete('/user/:id', 'UsersController.destroy')
})
  //.middleware('basic')
  .prefix('api')
