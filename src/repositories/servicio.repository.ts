import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Servicio, ServicioRelations, Encomienda, Cliente} from '../models';
import {EncomiendaRepository} from './encomienda.repository';
import {ClienteRepository} from './cliente.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly EncomiendaFk: BelongsToAccessor<Encomienda, typeof Servicio.prototype.id>;

  public readonly OrigenFk: BelongsToAccessor<Cliente, typeof Servicio.prototype.id>;

  public readonly DestinoFk: BelongsToAccessor<Cliente, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('EncomiendaRepository') protected encomiendaRepositoryGetter: Getter<EncomiendaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Servicio, dataSource);
    this.DestinoFk = this.createBelongsToAccessorFor('DestinoFk', clienteRepositoryGetter,);
    this.registerInclusionResolver('DestinoFk', this.DestinoFk.inclusionResolver);
    this.OrigenFk = this.createBelongsToAccessorFor('OrigenFk', clienteRepositoryGetter,);
    this.registerInclusionResolver('OrigenFk', this.OrigenFk.inclusionResolver);
    this.EncomiendaFk = this.createBelongsToAccessorFor('EncomiendaFk', encomiendaRepositoryGetter,);
    this.registerInclusionResolver('EncomiendaFk', this.EncomiendaFk.inclusionResolver);
  }
}
