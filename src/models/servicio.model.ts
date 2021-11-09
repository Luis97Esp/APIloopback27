import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Encomienda} from './encomienda.model';
import {Cliente} from './cliente.model';

@model()
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;
  @property({
    type: 'string',
    required: true,
  })
  valor: string;

  @belongsTo(() => Encomienda, {name: 'EncomiendaFk'})
  encomienda: string;

  @belongsTo(() => Cliente, {name: 'OrigenFk'})
  origen: string;

  @belongsTo(() => Cliente, {name: 'DestinoFk'})
  destino: string;

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
