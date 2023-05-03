import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PersonDto } from '../dto';
import { InputField } from '../../../ui';
import { VStack } from '@chakra-ui/react';

type PersonEditFormType = Omit<PersonDto, 'url'>;

export type PersonEditFormProps = {
  initialData: PersonEditFormType;
  formId: string;
  onSubmit: (data: PersonEditFormType) => void;
};

const schema = yup
  .object({
    name: yup.string().required().label('Name'),
    height: yup.string().required().label('Height'),
    mass: yup.string().required().label('Mass'),
    hairColor: yup.string().required().label('Hair color'),
    skinColor: yup.string().required().label('Skin color'),
    eyeColor: yup.string().required().label('Eye color'),
    birthYear: yup.string().required().label('Birth year'),
  })
  .required();

export const PersonEditForm: FC<PersonEditFormProps> = ({ initialData, formId, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonEditFormType>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <VStack>
        <InputField label="Name" isError={!!errors.name} helpText={errors.name?.message} {...register('name')} />
        <InputField
          label="Height"
          type="number"
          isError={!!errors.height}
          helpText={errors.height?.message}
          {...register('height')}
        />
        <InputField
          label="Mass"
          type="number"
          isError={!!errors.mass}
          helpText={errors.mass?.message}
          {...register('mass')}
        />
        <InputField
          label="Hair color"
          isError={!!errors.hairColor}
          helpText={errors.hairColor?.message}
          {...register('hairColor')}
        />
        <InputField
          label="Skin color"
          isError={!!errors.skinColor}
          helpText={errors.skinColor?.message}
          {...register('skinColor')}
        />
        <InputField
          label="Eye color"
          isError={!!errors.eyeColor}
          helpText={errors.eyeColor?.message}
          {...register('eyeColor')}
        />
        <InputField
          label="Birth year"
          isError={!!errors.birthYear}
          helpText={errors.birthYear?.message}
          {...register('birthYear')}
        />
      </VStack>
    </form>
  );
};
