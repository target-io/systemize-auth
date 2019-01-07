import * as Joi from 'joi';

// POST /auth/signup
export const signup = {
  body: {
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/).required(),
    phone: Joi.number().required(),
  },
};

// POST /auth/signin
export const signin = {
  body: {
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  },
};

// GET /auth/activate/:token
export const activate = {
  params: {
    token: Joi.string().required(),
  },
};

// POST /auth/reactivate
export const reactivate = {
  body: {
    email: Joi.string().email().required(),
  },
};

// POST /auth/refresh
export const refresh = {
  body: {
    token: Joi.string().required(),
    refreshToken: Joi.string().required(),
  },
};

// POST /auth/forgot
export const forgot = {
  body: {
    email: Joi.string().email().required(),
  },
};

// POST /auth/reset/:token
export const reset = {
  body: {
    token: Joi.string().required(),
    password: Joi.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/).required(),
  },
};
