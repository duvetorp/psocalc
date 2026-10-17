import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "@/styles/IconButton.module.css";

const IconButton = ({ icon, label, onClick, children }) => (
  <button
    type="button"
    className={`${Styles.iconButton} ${children ? Styles.withText : ""}`}
    onClick={onClick}
    aria-label={children ? undefined : label}
    title={label}
  >
    <FontAwesomeIcon icon={icon} />
    {children}
  </button>
);

export default IconButton;
