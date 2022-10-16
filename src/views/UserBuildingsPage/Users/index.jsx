import SingleSelect from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import { updateAllData } from "store/actions/getAllData";
import { getSelectedUser } from "store/actions/getSelectedUser";
import styles from "styles/Users/Users.module.scss";
import {
  findElementFunction,
  markIsSelectedFunction,
  resetIsSelectedFunction,
} from "utils/helper";

export default function Users(props) {
  const { setAddBuilding, setEditBuilding, setLoadingMap } = props;
  const userBuildings = useSelector((state) => state?.getAllData);
  const dispatch = useDispatch();

  const handleSelectUser = (el) => {
    const { id } = el;
    setAddBuilding(false);
    setEditBuilding(false);
    setLoadingMap(true);
    const resetIsSelectedArr = resetIsSelectedFunction(userBuildings?.data);
    const markeIsSelectedArr = markIsSelectedFunction(resetIsSelectedArr, id);
    dispatch(updateAllData(markeIsSelectedArr));
    const resetIsSelectedArrUpdate = resetIsSelectedFunction(
      userBuildings?.data
    );
    const markeIsSelectedArrUpdate = markIsSelectedFunction(
      resetIsSelectedArrUpdate
    );
    dispatch(getSelectedUser(findElementFunction(markeIsSelectedArrUpdate)));
    setTimeout(() => {
      setLoadingMap(false);
    }, 500);
  };

  return (
    <div className={styles.UsersContainer}>
      <SingleSelect
        options={userBuildings?.data}
        handleAction={handleSelectUser}
      />
    </div>
  );
}
