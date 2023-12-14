import { Transform, TransformFnParams } from 'class-transformer';
import { ValidationOptions, registerDecorator } from 'class-validator';

export const optionalBooleanMapper = new Map<any, undefined | boolean>([
  ['undefined', undefined],
  ['true', true],
  ['false', false],
]);

export class OptionalBooleanTransformer {
  to(value: any): undefined | boolean {
    const optionalBooleanMapper = new Map([
      ['undefined', undefined],
      ['true', true],
      ['false', false],
    ]);
    return optionalBooleanMapper.get(value);
  }
}

export const ParseOptionalBoolean = () =>
  Transform((params: TransformFnParams) => {
    const transformer = new OptionalBooleanTransformer();
    return transformer.to(params.value);
  });

interface IsFileOptions {
  mime: ('image/jpg' | 'image/png' | 'image/jpeg')[];
}

export function IsFile(
  options: IsFileOptions,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    return registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (
            value?.mimetype &&
            (options?.mime ?? []).includes(value?.mimetype)
          ) {
            return true;
          }
          return false;
        },
      },
    });
  };
}
