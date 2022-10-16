import React, { Fragment, useEffect, useState } from "react";
import BuildingsList from "./BuildingsList";
import Users from "./Users";
import styles from "styles/UserBuildingsPage/UserBuildingsPage.module.scss";
import AddBuilding from "./AddBuilding";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "store/actions/getAllData";
import Loading from "components/Loading";
import MapLocation from "./Map";
import EditBuilding from "./EditBuilding";
import Header from "components/Header";

export default function UserBuildingsPage() {
  const [addBuilding, setAddBuilding] = useState(false);
  const [editBuilding, setEditBuilding] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);
  const userBuildings = useSelector((state) => state?.getAllData);
  const selectedBuild = useSelector((state) => state?.getSelectedBuild);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  if (userBuildings?.loading) {
    return <Loading />;
  }

  return (
    <div>
      <Fragment>
        <Users
          setAddBuilding={setAddBuilding}
          setEditBuilding={setEditBuilding}
          setLoadingMap={setLoadingMap}
        />
        <div className={styles.containerUserBuildingsMap}>
          <div className={styles.BuildingListWrapper}>
            <BuildingsList
              setAddBuilding={setAddBuilding}
              setEditBuilding={setEditBuilding}
              setLoadingMap={setLoadingMap}
            />
          </div>
          <div className={styles.FormMapWrapper}>
            {addBuilding ? (
              <AddBuilding
                setAddBuilding={setAddBuilding}
                setLoadingMap={setLoadingMap}
              />
            ) : editBuilding ? (
              <EditBuilding
                setEditBuilding={setEditBuilding}
                setLoadingMap={setLoadingMap}
              />
            ) : (
              <>
                <Header
                  title={`Selected Building (${selectedBuild?.selectedBuild?.buildingName}) Map View`}
                />
                {!loadingMap ? (
                  <MapLocation loadingMap={loadingMap} />
                ) : (
                  <Loading />
                )}
              </>
            )}
          </div>
        </div>
      </Fragment>
    </div>
  );
}
