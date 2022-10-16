import styles from "styles/BuildingsList/BuildingsList.module.scss";
import DeleteIcon from "assets/icons/delete.png";
import EditIcon from "assets/icons/edit.png";
import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSelectedUser } from "store/actions/getSelectedUser";
import { getSelectedBuild } from "store/actions/getSelectedBuild";
import { updateAllData } from "store/actions/getAllData";
import {
  deleteElementFunction,
  findElementFunction,
  markIsSelectedFunction,
  resetIsSelectedFunction,
} from "utils/helper";

export default function BuildingsList({
  setAddBuilding,
  setEditBuilding,
  setLoadingMap,
}) {
  const userBuildings = useSelector((state) => state?.getAllData);
  const selectedUser = useSelector((state) => state?.getSelectedUser);
  const selectedBuild = useSelector((state) => state?.getSelectedBuild);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSelectedUser(findElementFunction(userBuildings?.data)));
  }, [dispatch, userBuildings]);

  useEffect(() => {
    dispatch(
      getSelectedBuild(
        findElementFunction(selectedUser?.selectedUser?.buildings)
      )
    );
  }, [dispatch, selectedUser]);

  const handleSelectBuild = (id) => {
    const resetIsSelectedArr = resetIsSelectedFunction(
      selectedUser?.selectedUser?.buildings
    );
    const markeIsSelectedArr = markIsSelectedFunction(resetIsSelectedArr, id);
    dispatch(getSelectedBuild(findElementFunction(markeIsSelectedArr)));
  };

  const handleDeleteBuild = (id, userId) => {
    const deleteElement = deleteElementFunction(
      userBuildings?.data,
      id,
      userId
    );
    dispatch(updateAllData(deleteElement));
  };

  return (
    <div className={styles.BuildingsList}>
      <Header title="Buildings" hasButton setAddBuilding={setAddBuilding} />
      <div className={styles.Contents}>
        {selectedUser?.selectedUser?.buildings?.map((build) => (
          <div className={styles.ContentItem} key={build?.id}>
            <div
              className={
                build?.id === selectedBuild?.selectedBuild?.id
                  ? styles.ItemTextSelected
                  : styles.ItemText
              }
              onClick={() => {
                setAddBuilding(false);
                setEditBuilding(false);
                setLoadingMap(true);
                setTimeout(() => {
                  setLoadingMap(false);
                }, 1000);
                handleSelectBuild(build?.id);
              }}
            >
              <span>{build?.buildingName}</span>
            </div>
            <div className={styles.ItemOptions}>
              <img
                className={styles.edit}
                src={EditIcon}
                alt="edit"
                onClick={() => {
                  setAddBuilding(false);
                  setEditBuilding(true);
                  handleSelectBuild(build?.id);
                }}
              />
              <img
                className={styles.delete}
                src={DeleteIcon}
                alt="delete"
                onClick={() =>
                  handleDeleteBuild(build?.id, selectedUser?.selectedUser?.id)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
