/* eslint-disable prefer-const */

export const validata = (schema: any, options: any = {}) => {
  return (req: any, res: any, next: any) => {
    for (let [key, value] of Object.entries(schema)) {
      if (key === 'body') {
        if (options.baseSchema && options.baseSchema.body.length > 0) {
          const baseSchema = options.baseSchema.body.reduce((acc: any, item: any) => {
            return acc.concat(item);
          });
          value = baseSchema.concat(value);
        }
        // @ts-ignore
        const { error } = value.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: false,
            message: `invalid payload. ${error.message}`,
            data: null,
          });
        }
      } else if (key === 'query') {
        if (options.baseSchema && options.baseSchema.query.length > 0) {
          const baseSchema = options.baseSchema.body.reduce((acc: any, item: any) => {
            return acc.concat(item);
          });
          value = baseSchema.concat(value);
        }
        // @ts-ignore
        const { error } = value.validate(req.query);
        if (error) {
          return res.status(400).json({
            status: false,
            message: `invalid payload. ${error.message}`,
            data: null,
          });
        }
      } else {
        if (options.baseSchema && options.baseSchema.params.length > 0) {
          const baseSchema = options.baseSchema.body.reduce((acc: any, item: any) => {
            return acc.concat(item);
          });
          value = baseSchema.concat(value);
        }
        // @ts-ignore
        const { error } = value.validate(req.params);
        if (error) {
          return res.status(400).json({
            status: false,
            message: `invalid payload. ${error.message}`,
            data: null,
          });
        }
      }
    }

    next();
  };
};
