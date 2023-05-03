import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react';
import { FC, forwardRef } from 'react';

export type InputFieldProps = {
  label: string;
  isError?: boolean;
  helpText?: string;
} & InputProps;

export const InputField: FC<InputFieldProps> = forwardRef(({ label, isError, helpText, ...inputProps }, ref) => (
  <FormControl isInvalid={isError}>
    <FormLabel>{label}</FormLabel>
    <Input {...inputProps} ref={ref} />
    {!isError ? <FormHelperText>{helpText}</FormHelperText> : <FormErrorMessage>{helpText}</FormErrorMessage>}
  </FormControl>
));
