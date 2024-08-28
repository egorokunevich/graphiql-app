import { TextField } from '@mui/material';

const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  error,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required: boolean;
  error: string | undefined;
}) => {
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
        className="w-full border rounded-md focus:outline-none focus:border-blue-500"
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
