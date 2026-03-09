export const reqValidator = (schema) => async (req, res, next) => {
  try {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      const formattedErrors = result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        status: "error",
        errors: formattedErrors,
        message: "Validation failed.",
      });
    }

    req.body = result.data;
    next();
  } catch (e) {
    next(e);
  }
};
