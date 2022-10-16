import styles from "styles/AddBuilding/AddBuilding.module.scss";
import Header from "components/Header";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Input from "components/Input";
import SingleSelect from "components/Select";
import countriesList from "data/countriesList.json";
import { updateAllData } from "store/actions/getAllData";
import { AddFunction } from "utils/helper";

export default function AddBuilding(props) {
  const [buildingName, setBuildingName] = useState("");
  const [country, setCountry] = useState(null);
  const { setAddBuilding, setLoadingMap } = props;
  const selectedUser = useSelector((state) => state?.getSelectedUser);
  const userBuildings = useSelector((state) => state?.getAllData);
  const dispatch = useDispatch();

  const handleSelectCountry = (country) => {
    setCountry(country);
  };

  const handleAddBuilding = () => {
    setLoadingMap(true);
    setAddBuilding(false);
    const addElement = AddFunction(
      userBuildings?.data,
      selectedUser?.selectedUser?.id,
      buildingName,
      country
    );
    dispatch(updateAllData(addElement));
    setTimeout(() => {
      setLoadingMap(false);
    }, 500);
  };

  return (
    <div className={styles.ContentAddBuilding}>
      <Header title="Add Building" />
      <div className={styles.AddForm}>
        <div className={styles.ContainerForm}>
          <div className={styles.ContentForm}>
            <div className={styles.Input}>
              <p>Building Name</p>
              <Input
                value={buildingName}
                placeholder="Building Name"
                handleAction={setBuildingName}
                label="Building Name"
                for="name"
              />
            </div>
            <div className={styles.Input}>
              <p>Location</p>
              <SingleSelect
                options={countriesList}
                handleAction={handleSelectCountry}
              />
            </div>
          </div>
          <div className={styles.ContainerBtns}>
            <Button
              title="Create"
              handleAction={() => {
                handleAddBuilding();
              }}
            />
            <Button
              title="Cancel"
              handleAction={() => {
                setAddBuilding(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
