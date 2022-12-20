import Cidade from 'App/Models/Cidade'

export default interface CidadeRepositoryInterface {
  index(): Promise<Cidade[]>

  store(payload: object): Promise<Cidade>
}
