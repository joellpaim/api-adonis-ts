import Factory from "@ioc:Adonis/Lucid/Factory"
import Cidade from "../Cidade"

export const CidadeFactory = Factory.define(Cidade, ({ faker }) => {
    return {
        nom_cidade: faker.address.cityName(),
        id_ibge: 777,
        id_estado: 1,
        id_pais: 1,
    }
}).build()