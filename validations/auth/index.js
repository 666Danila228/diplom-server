import Joi from 'joi';
import prisma from '../../prisma/prismaClient.js';
import { checkRecordExists } from '../../utils/checkRecordExists.js';

const checkEmailExists = async (email) => {
  await checkRecordExists('Пользователь', 'user', 'email', email, false);
};

const checkRoleId = async (role_id) => {
  if (!role_id) return;
    await checkRecordExists('Роль', 'role', 'id', role_id, true);
};

const checkEmailExistsLogin = async (email) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    throw new Joi.ValidationError('Неверный логин или пароль', [{ message: 'Неверный email или пароль', path: ['All'], type: 'email.exists' }], null);
  }
}

export const registerSchema = Joi.object({
  surname: Joi.string().pattern(new RegExp('^[а-яА-Я]')).min(3).max(25).required().messages({
    'string.base': 'Фамилия пользователя должна быть строкой',
    'string.empty': 'Фамилия пользователя не может быть пустым',
    'string.min': 'Фамилия пользователя должна быть не менее {#limit} символов',
    'string.max': 'Фамилия пользователя должна быть не более {#limit} символов',
    'any.required': 'Фамилия пользователя обязательна',
  }),
  name: Joi.string().pattern(new RegExp('^[а-яА-Я]')).min(3).max(25).required().messages({
    'string.base': 'Имя пользователя должно быть строкой',
    'string.empty': 'Имя пользователя не может быть пустым',
    'string.min': 'Имя пользователя должно быть не менее {#limit} символов',
    'string.max': 'Имя пользователя должно быть не более {#limit} символов',
    'any.required': 'Имя пользователя обязательно'
  }),
  patronymic: Joi.string().pattern(new RegExp('^[а-яА-Я]')).min(5).max(25).required().messages({
    'string.base': 'Отчество пользователя должно быть строкой',
    'string.empty': 'Отчество пользователя не может быть пустым',
    'string.min': 'Отчество пользователя должно быть не менее {#limit} символов',
    'string.max': 'Отчество пользователя должно быть не более {#limit} символов',
    'any.required': 'Отчество пользователя обязательно'
  }),
  email: Joi.string().email().required().external(checkEmailExists).messages({
    'string.base': 'Email должен быть строкой',
    'string.empty': 'Email не может быть пустым',
    'string.email': 'Пожалуйста, введите корректный email',
    'any.required': 'Email обязателен',
    'external': 'Email уже занят',
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
    'string.base': 'Пароль должен быть строкой',
    'string.empty': 'Пароль не может быть пустым',
    'string.pattern.base': 'Пароль должен содержать только латинские буквы и цифры',
    'any.required': 'Пароль обязателен'
  }),
  role_id: Joi.number().optional().external(checkRoleId).messages({
    'number.base': 'id должен быть числовым',
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email должен быть строкой',
    'string.empty': 'Email не может быть пустым',
    'string.email': 'Пожалуйста, введите корректный email',
    'any.required': 'Email обязателен'
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
    'string.base': 'Пароль должен быть строкой',
    'string.empty': 'Пароль не может быть пустым',
    'string.pattern.base': 'Пароль должен содержать только латинские буквы и цифры',
    'any.required': 'Пароль обязателен'
  })
});

