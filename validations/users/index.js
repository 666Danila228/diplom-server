import Joi from 'joi';
import prisma from '../../prisma/prismaClient.js';

// Асинхронная функция проверки занятости email
const checkEmailExists = async (email) => {

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email уже занят');
  }
};

export const updateUserSchema = Joi.object({
  surname: Joi.string().pattern(new RegExp('^[а-яА-Я]{3,30}$')).messages({
    'string.base': 'Фамилия пользователя должно быть строкой',
    'string.empty': 'Фамилия пользователя не может быть пустым',
    'string.pattern.base': 'Фамилия пользователя должно содержать только русские буквы',
    'string.min': 'Фамилия пользователя должно быть не менее {#limit} символов',
    'string.max': 'Фамилия пользователя должно быть не более {#limit} символов',
  }),
  name: Joi.string().pattern(new RegExp('^[а-яА-Я]{3,30}$')).min(3).max(25).messages({
    'string.base': 'Имя пользователя должно быть строкой',
    'string.empty': 'Имя пользователя не может быть пустым',
    'string.min': 'Имя пользователя должно быть не менее {#limit} символов',
    'string.max': 'Имя пользователя должно быть не более {#limit} символов',
  }),
  patronymic: Joi.string().pattern(new RegExp('^[а-яА-Я]{3,30}$')).min(5).max(25).messages({
    'string.base': 'Отчество пользователя должно быть строкой',
    'string.empty': 'Отчество пользователя не может быть пустым',
    'string.min': 'Отчество пользователя должно быть не менее {#limit} символов',
    'string.max': 'Отчество пользователя должно быть не более {#limit} символов',
  }),
  email: Joi.string().email().external(async (email) => {
    if (email) {
      await checkEmailExists(email); // проверка уникальности только если email передан
    }
  }).messages({
    'string.base': 'Email должен быть строкой',
    'string.empty': 'Email не может быть пустым',
    'string.email': 'Пожалуйста, введите корректный email',
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
    'string.base': 'Пароль должен быть строкой',
    'string.empty': 'Пароль не может быть пустым',
    'string.pattern.base': 'Пароль должен содержать только латинские буквы и цифры',
  })
}).min(1);