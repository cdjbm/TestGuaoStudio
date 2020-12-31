import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Blogs} from '../models';
import {BlogsRepository} from '../repositories';

export class BlogsController {
  constructor(
    @repository(BlogsRepository)
    public blogsRepository : BlogsRepository,
  ) {}

  @post('/blogs', {
    responses: {
      '200': {
        description: 'Blogs model instance',
        content: {'application/json': {schema: getModelSchemaRef(Blogs)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blogs, {
            title: 'NewBlogs',
            exclude: ['_id'],
          }),
        },
      },
    })
    blogs: Omit<Blogs, '_id'>,
  ): Promise<Blogs> {
    return this.blogsRepository.create(blogs);
  }

  @get('/blogs/count', {
    responses: {
      '200': {
        description: 'Blogs model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Blogs) where?: Where<Blogs>,
  ): Promise<Count> {
    return this.blogsRepository.count(where);
  }

  @get('/blogs', {
    responses: {
      '200': {
        description: 'Array of Blogs model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Blogs, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Blogs) filter?: Filter<Blogs>,
  ): Promise<Blogs[]> {
    return this.blogsRepository.find(filter);
  }

  @patch('/blogs', {
    responses: {
      '200': {
        description: 'Blogs PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blogs, {partial: true}),
        },
      },
    })
    blogs: Blogs,
    @param.where(Blogs) where?: Where<Blogs>,
  ): Promise<Count> {
    return this.blogsRepository.updateAll(blogs, where);
  }

  @get('/blogs/{id}', {
    responses: {
      '200': {
        description: 'Blogs model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Blogs, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Blogs, {exclude: 'where'}) filter?: FilterExcludingWhere<Blogs>
  ): Promise<Blogs> {
    return this.blogsRepository.findById(id, filter);
  }

  @patch('/blogs/{id}', {
    responses: {
      '204': {
        description: 'Blogs PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Blogs, {partial: true}),
        },
      },
    })
    blogs: Blogs,
  ): Promise<void> {
    await this.blogsRepository.updateById(id, blogs);
  }

  @put('/blogs/{id}', {
    responses: {
      '204': {
        description: 'Blogs PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() blogs: Blogs,
  ): Promise<void> {
    await this.blogsRepository.replaceById(id, blogs);
  }

  @del('/blogs/{id}', {
    responses: {
      '204': {
        description: 'Blogs DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.blogsRepository.deleteById(id);
  }
}
