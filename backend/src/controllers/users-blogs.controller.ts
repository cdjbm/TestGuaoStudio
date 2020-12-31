import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Users,
  Blogs,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersBlogsController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/blogs', {
    responses: {
      '200': {
        description: 'Array of Users has many Blogs',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Blogs)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Blogs>,
  ): Promise<Blogs[]> {
    return this.usersRepository.blogs(id).find(filter);
  }

  @post('/users/{id}/blogs', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Blogs)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Users.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blogs, {
            title: 'NewBlogsInUsers',
            exclude: ['_id'],
            optional: ['usersId']
          }),
        },
      },
    }) blogs: Omit<Blogs, '_id'>,
  ): Promise<Blogs> {
    return this.usersRepository.blogs(id).create(blogs);
  }

  @patch('/users/{id}/blogs', {
    responses: {
      '200': {
        description: 'Users.Blogs PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blogs, {partial: true}),
        },
      },
    })
    blogs: Partial<Blogs>,
    @param.query.object('where', getWhereSchemaFor(Blogs)) where?: Where<Blogs>,
  ): Promise<Count> {
    return this.usersRepository.blogs(id).patch(blogs, where);
  }

  @del('/users/{id}/blogs', {
    responses: {
      '200': {
        description: 'Users.Blogs DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Blogs)) where?: Where<Blogs>,
  ): Promise<Count> {
    return this.usersRepository.blogs(id).delete(where);
  }
}
