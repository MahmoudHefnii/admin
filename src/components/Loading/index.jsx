import DeleteIcon from "assets/svg/loading.svg";
import styles from "styles/Loading/Loading.module.scss";

export default function Loading(props) {
  return (
    <div className={styles.Loading}>
      <img src={DeleteIcon} alt="loading" />
    </div>
  );
}
