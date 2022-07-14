import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Record<string, unknown>
) => {
  // tranform the literal object to class object
  const objInstance = plainToClass(dto, obj);
  // validating and check the errors, throw the errors if exist
  const errors = await validate(objInstance);
  // errors is an array of validation errors
  if (errors.length > 0) {
    console.error(errors);
    throw new TypeError(
      `validation failed. The error fields : ${errors.map(
        ({ property, children }) =>
          children?.length ? property + "." + children[0].property : property
      )}`
    );
  }

  return objInstance;
};
