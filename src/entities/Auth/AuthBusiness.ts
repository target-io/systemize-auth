import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from 'http-status-codes';

import AuthController from './AuthController';

import GenericException from '../../shared/exceptions/GenericException';
import RedisController from '../../shared/class/RedisController';
import KafkaController from '../../shared/class/KafkaController';

const redis = new RedisController();
const kafka = new KafkaController();
const auth = new AuthController();

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await auth.save(req.body);
    kafka.passData([{
      topic: 'user-to-org-topic',
      messages: JSON.stringify(user),
      key: 'newUser',
      partition: 0,
      timestamp: Date.now(),
    }]);
    res.status(CREATED).send(user);
  } catch (err) {
    next(new GenericException({ name: err.name, message: err.message }));
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // create new client for publisher & subscriber
    const publisher = redis.newClient();
    const subscriber = redis.newClient();
    // subscribe & publish for user authentication
    subscriber.on('subscribe', (channel: String, message: any) => {
      publisher.publish('auth-user-signin-request', JSON.stringify(req.body));
    });
    subscriber.on('message', (channel: String, message: any) => {
      console.log('------it works only on user-auth-signin-response------');
      console.log(channel);
      console.log(message);
      // return the response
      if (message instanceof GenericException) {
        throw new Error(message.message);
      }
      res.send(message);
    });
    subscriber.subscribe('user-auth-signin-response');
  } catch (err) {
    next(new GenericException({ name: err.name, message: err.message }));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await redis.getCache(`${auth.cacheKey}${userId}`);
    res.status(OK).send(user);
  } catch (err) {
    next(new GenericException({ name: err.name, message: err.message }));
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    let user = await redis.getCache(`${auth.cacheKey}${userId}`);
    user = { ...user, ...req.body };
    await auth.update(user);
    res.status(OK).send(user);
  } catch (err) {
    next(new GenericException({ name: err.name, message: err.message }))
  }
};

export const cache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    // check user already in cache
    let user = await redis.getCache(`${auth.cacheKey}${userId}`);
    if (user) {
      return next();
    }
    // get user from db & set cache
    user = await auth.findById(userId);
    if (user) {
      await redis.setCache(`${auth.cacheKey}${userId}`, user);
      return next();
    }
    throw new Error('Invalid user id');
  } catch (err) {
    next(new GenericException({ name: err.name, message: err.message }));
  }
};
