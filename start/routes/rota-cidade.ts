import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/cidades', 'CidadesController.index')
  Route.get('/cidade/:id_cidade', 'CidadesController.show')
  Route.post('/cidade', 'CidadesController.store')
  Route.put('/cidade/:id_cidade', 'CidadesController.update')
  Route.delete('/cidade/:id_cidade', 'CidadesController.destroy')
})
  //.middleware('basic')
  .prefix('api')
