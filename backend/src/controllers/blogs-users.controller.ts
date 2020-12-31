import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Blogs,
  Users,
} from '../models';
import {BlogsRepository} from '../repositories';

export class BlogsUsersController {
  constructor(
    @repository(BlogsRepository)
    public blogsRepository: BlogsRepository,
  ) { }

  @get('/blogs/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Blogs',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.string('id') id: typeof Blogs.prototype._id,
  ): Promise<Users> {
    return this.blogsRepository.users(id);
  }
}
