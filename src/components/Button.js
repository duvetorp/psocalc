import Styles from "@/styles/Button.module.css";

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  fullWidth = false,
}) => (
  <button
    type="button"
    className={`${Styles.button} ${Styles[variant]} ${
      fullWidth ? Styles.fullWidth : ""
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
