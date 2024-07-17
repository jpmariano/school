import React from 'react';
import styles from '@/styles/components/loginform/loginsignupbtn.module.scss';
import { Box, Button } from '@mui/material';

interface TextInputProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    label: string;
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
    errorMessage?: string;
    placeholder?: string;
    type?: string;
    maxLength?: number | { min?: number; max: number };
  }

const TextInput: React.FC<TextInputProps> = ({ 
    id,
    value,
    onChange,
    label,
    required = false,
    disabled = false,
    error = false,
    errorMessage = '',
    maxLength,
    placeholder,
    type, }) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        };
  return (
    <Box component={"input"} value={value} type={type} id={id} className={`border rounded  border-solid w-full h-12 p-5 ${error ? 'border-rose-500' : 'border-gray-400'} `}
    placeholder={placeholder} required={required} disabled={disabled} 
    onChange={handleInputChange}
                  />
  );
};

export default TextInput;
