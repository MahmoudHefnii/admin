import styles from "styles/Input/Input.module.scss";

export default function Input(props) {
  const { value, placeholder, handleAction } = props;
  return (
    <>
      <input
        className={styles.Input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleAction(e?.target?.value)}
        maxLength={30}
      />
    </>
  );
}
