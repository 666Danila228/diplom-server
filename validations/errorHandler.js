export const handleValidationError = (error) => {
  const errors = {};

  error.details.forEach((detail) => {
    const key = detail.context.key;
    errors[key] = detail.message;
  });

  return errors;
};