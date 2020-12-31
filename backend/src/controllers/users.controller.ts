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
  getJsonSchemaRef,
  HttpErrors,
} from '@loopback/rest';
import {validate} from 'isemail';
import {Users} from '../models';
import {UsersRepository, Credential} from '../repositories';
import {validateCredentials} from '../services/validator';
import * as _ from 'lodash';
import {inject} from '@loopback/core';
import {BcryptHasher} from '../services/hash.password.bcrypt';
import {type} from 'os';
import {AuthServices} from '../services/auth.service';

export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject('service.hasher')
    public hasher: BcryptHasher,
    @inject('service.auth')
    public authServices: AuthServices,
  ) {}
  @post('/users/signup', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getJsonSchemaRef(Users)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
          }),
        },
      },
    })
    users: Omit<Users, '_id'>,
  ): Promise<Users> {
    let user = await this.usersRepository.findOne({
      where: {email: users.email},
    });
    if (user) {
      throw new HttpErrors[409]('Ya existe una cuenta con ese correo');
    }
    validateCredentials(_.pick(users, ['email', 'password']));
    users.password = await this.hasher.hashPassword(users.password);
    return this.usersRepository.create(users);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Login for users',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(@requestBody() credential: Credential): Promise<object> {
    let user = await this.authServices.verifyCredentials(credential);
    if (user) {
      let tk = await this.authServices.GenerateToken(user);
      console.log(tk);
      return {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          birthdate: user.birthdate,
          gender: user.gender,
        },
        token: tk.token,
      };
    } else {
      throw new HttpErrors[401]('Usuario o contraseña invalida.');
    }
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'Users model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Users) where?: Where<Users>): Promise<Count> {
    return this.usersRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Users, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Users) filter?: Filter<Users>): Promise<Users[]> {
    return this.usersRepository.find({include: ['blogs']});
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'Users PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
    @param.where(Users) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.updateAll(users, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Users, {exclude: 'where'})
    filter?: FilterExcludingWhere<Users>,
  ): Promise<Users> {
    return this.usersRepository.findById(id, {
      include: [{relation: 'usersId'}],
    });
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('_id') _id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
  ): Promise<void> {
    await this.usersRepository.updateById(_id, users);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('_id') _id: string,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(_id, users);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'Users DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('_id') _id: string): Promise<void> {
    await this.usersRepository.deleteById(_id);
  }
}
