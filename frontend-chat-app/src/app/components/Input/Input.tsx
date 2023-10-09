import { ChangeEvent, useCallback } from "react";

interface InputProps {
  placeholder: string;
  onChangeValue: (value: string) => void;
  adjustClassname?: string;
  value: string;
}
export const Input = ({
  placeholder,
  onChangeValue,
  adjustClassname = "",
  value = "",
}: InputProps) => {
  const handleValue = useCallback(
    (newValue: string) => {
      onChangeValue(newValue);
    },
    [onChangeValue]
  );

  return (
    <input
      className={`input ${adjustClassname}`}
      placeholder={placeholder}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        handleValue(event.target.value)
      }
    />
  );
};
