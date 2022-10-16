export const findElementFunction = (arr) => {
  return arr?.find((el) => el?.isSelected);
};

export const resetIsSelectedFunction = (arr) => {
  return arr?.map((el) => {
    return { ...el, isSelected: false };
  });
};

export const markIsSelectedFunction = (arr, id) => {
  return arr?.map((el) => {
    if (el?.id === id) {
      return { ...el, isSelected: true };
    }
    return el;
  });
};

export const deleteElementFunction = (arr, id, userId) => {
  return arr?.map((el) => {
    if (el?.id === userId) {
      return {
        ...el,
        buildings: el?.buildings?.filter((el) => {
          return el?.id !== id;
        }),
      };
    }
    return el;
  });
};

export const AddFunction = (arr, id, name, country) => {
  return arr?.map((el) => {
    if (el?.id === id) {
      return {
        ...el,
        buildings: [
          ...el.buildings.map((el) => {
            return { ...el, isSelected: false };
          }),
          {
            id: Math.random(),
            buildingName: name,
            isSelected: true,
            locationId: country?.value,
            location: country?.name,
            position: country?.position,
          },
        ],
      };
    }
    return el;
  });
};

export const updateFunction = (arr, id, buildingId, name, country) => {
  return arr?.map((el) => {
    if (el?.id === id) {
      return {
        ...el,
        buildings: [
          ...el.buildings.map((el) => {
            if (el?.id === buildingId) {
              return {
                id: buildingId,
                buildingName: name,
                isSelected: true,
                locationId: country?.value,
                location: country?.name,
                position: country?.position,
              };
            }
            return { ...el, isSelected: false };
          }),
        ],
      };
    }
    return el;
  });
};
