import styles from "styles/AddBuilding/AddBuilding.module.scss";
import Header from "components/Header";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Input from "components/Input";
import SingleSelect from "components/Select";
import countriesList from "data/countriesList.json";
import { updateAllData } from "store/actions/getAllData";
import { updateFunction } from "utils/helper";

export default function EditBuilding(props) {
  const selectedUser = useSelector((state) => state?.getSelectedUser);
  const userBuildings = useSelector((state) => state?.getAllData);
  const selectedBuild = useSelector((state) => state?.getSelectedBuild);
  const [buildingName, setBuildingName] = useState("");
  const [country, setCountry] = useState(null);
  const [showCountry, setShowCountry] = useState(false);
  const { setEditBuilding, setLoadingMap } = props;
  const dispatch = useDispatch();

  const handleSelectCountry = (country) => {
    setCountry(country);
  };

  const handleEditBuilding = () => {
    setLoadingMap(true);
    setEditBuilding(false);
    const updateElement = updateFunction(
      userBuildings?.data,
      selectedUser?.selectedUser?.id,
      selectedBuild?.selectedBuild?.id,
      buildingName,
      country
    );
    console.log(updateElement);
    dispatch(updateAllData(updateElement));
    setTimeout(() => {
      setLoadingMap(false);
    }, 500);
  };

  useEffect(() => {
    setBuildingName(selectedBuild?.selectedBuild?.buildingName);
    const selectedCountry = countriesList?.find(
      (el) => el?.id === selectedBuild?.selectedBuild?.locationId
    );
    setCountry({
      ...selectedCountry,
      value: selectedCountry?.id,
      label: selectedCountry?.name,
    });
    setShowCountry(false);
    setTimeout(() => {
      setShowCountry(true);
    }, 0);
  }, [selectedBuild]);

  return (
    <div className={styles.ContentAddBuilding}>
      <Header title="Edit Building" />
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
              {showCountry && (
                <SingleSelect
                  options={countriesList}
                  handleAction={handleSelectCountry}
                  defaultValue={country}
                />
              )}
            </div>
          </div>
          <div className={styles.ContainerBtns}>
            <Button
              title="Update"
              handleAction={() => {
                handleEditBuilding();
              }}
            />
            <Button
              title="Cancel"
              handleAction={() => {
                setEditBuilding(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
