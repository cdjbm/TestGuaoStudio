import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Users} from './users.model';

@model()
export class Blogs extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  resume: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  tags?: string[];

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @belongsTo(() => Users)
  usersId: string;
}

export interface BlogsRelations {
  // describe navigational properties here
}

export type BlogsWithRelations = Blogs & BlogsRelations;
