import { TextField } from '@mui/material';

import { InputFieldProps } from '@/src/types/index';

const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  error,
  onBlur,
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-600">
        {label}
      </label>
      <TextField
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full border rounded-md focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
        required={required}
        fullWidth
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
