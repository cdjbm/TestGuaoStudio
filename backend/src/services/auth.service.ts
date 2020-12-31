import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Credential} from '../repositories/users.repository';

import {Users} from '../models';
import {UsersRepository} from '../repositories';
import {BcryptHasher} from './hash.password.bcrypt';
import {HttpErrors} from '@loopback/rest';
const jwt = require('jsonwebtoken');
export class AuthServices {
  constructor(
    @repository(UsersRepository)
    public userRepository: UsersRepository,
    @inject('service.hasher')
    public hasher: BcryptHasher,
  ) {}
  async verifyCredentials(credential: Credential): Promise<Users | undefined> {
    let user = await this.userRepository.findOne({
      where: {email: credential.email},
    });
    console.log(user);
    if (user) {
      const passwordMatched = await this.hasher.comparePassword(
        credential.password,
        user.password,
      );
      if (!passwordMatched) {
        throw new HttpErrors.Unauthorized('password not valid');
      }
      return user;
    }
  }
  async GenerateToken(user: Users) {
    user.password = '';
    let token = jwt.sign(
      {
        data: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      'JWT@SecretKey*',
    );
    const obj = {token: ''};
    obj.token = token;
    return obj;
  }
}
