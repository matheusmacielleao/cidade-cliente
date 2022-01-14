export const serialize = (error: any) => {
  const errorSerializer = error.details.map((details: any) => ({
    description: details.context.label,
    message: details.message,
  }));
  return errorSerializer;
};
