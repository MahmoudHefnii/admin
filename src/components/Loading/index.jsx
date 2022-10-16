import styles from "styles/Loading/Loading.module.scss";
import DeleteIcon from "assets/svg/loading.svg";

export default function Loading(props) {
  return (
    <div className={styles.Loading}>
      <img src={DeleteIcon} alt="loading" />
    </div>
  );
}
