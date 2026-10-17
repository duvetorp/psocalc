import Styles from "@/styles/Layout.module.css";

const Toolbar = ({ left, title, right }) => (
  <div className={Styles.toolbar}>
    <div className={Styles.toolbarSlot}>{left}</div>
    <h1>{title}</h1>
    <div className={Styles.toolbarSlot}>{right}</div>
  </div>
);

export default Toolbar;
