import {HttpErrors} from '@loopback/rest';
import * as isEmail from 'isemail';
import {Credential} from '../repositories/users.repository';

export function validateCredentials(credential: Credential) {
  if (!isEmail.validate(credential.email)) {
    throw new HttpErrors.UnprocessableEntity('Correo no valido');
  }

  if (credential.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'Su contraseña tiene menos de 8 caracteres',
    );
  }
}
