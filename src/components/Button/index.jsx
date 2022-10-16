import styles from "styles/Button/Button.module.scss";

export default function Button(props) {
  const { title, handleAction } = props;
  return (
    <button className={styles.button} onClick={handleAction}>
      {title}
    </button>
  );
}
