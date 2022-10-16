import Button from "components/Button";
import styles from "styles/Header/Header.module.scss";

export default function Header(props) {
  const { title, hasButton, setAddBuilding } = props;
  return (
    <div className={styles.Header}>
      <span>{title}</span>
      {hasButton && (
        <Button
          title="Add Building"
          handleAction={() => setAddBuilding(true)}
        />
      )}
    </div>
  );
}
