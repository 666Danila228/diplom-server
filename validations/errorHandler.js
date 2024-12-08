export const handleValidationError = (error) => {
  const errors = {};

  error.details.forEach((detail) => {
    const key = detail.context && detail.context.key ? detail.context.key : detail.path[0];
    errors[key] = detail.message;
  });

  return errors;
};