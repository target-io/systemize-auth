import { UserInterface } from './AuthInterface';
import { AController } from '../../shared/class/AbstractController';

import AuthModel from './AuthModel';

export default class AuthController extends AController <UserInterface> {
  public cacheKey: String = 'auth-';

  constructor() {
    super(AuthModel);
  }
}