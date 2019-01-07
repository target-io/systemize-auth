import { Request, Response, NextFunction, Router } from 'express';
import * as validate from 'express-validation';

import * as auth from './../../entities/Auth/AuthBusiness';
import * as validator from '../../entities/Auth/AuthValidator';
import UnprocessableEntityException from '../../shared/exceptions/UnprocessableEntityException';

const router = Router();

router.post('/signup', validate(validator.signup), auth.signup);

router.post('/signin', validate(validator.signin), auth.signin);

// router.get('/activate/:token', validate(validator.activate), auth.activate);

// router.post('/reactivate', validate(validator.reactivate), auth.reactivate);

// router.post('/refresh', validate(validator.refresh), auth.refresh);

// router.post('/forgot', validate(validator.forgot), auth.forgot);

// router.post('/reset', validate(validator.reset), auth.reset);

export default router;