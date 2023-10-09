interface ButtonProps {
  label: string;
  typeButton?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

export const Button = ({ label, typeButton, disabled }: ButtonProps) => {
  return (
    <button className="button" type={typeButton} disabled={disabled}>
      {label}
    </button>
  );
};
