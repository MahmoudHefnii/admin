import { useEffect } from "react";
import Select from "react-select";
import { colourStyles } from "./style";

export default function SingleSelect(props) {
  const { options, defaultValue, handleAction } = props;

  const allOptions = options.map((el) => {
    return { ...el, value: el?.id, label: el?.name };
  });

  const handleChange = (item) => {
    handleAction(item);
  };

  useEffect(() => {
    handleAction(defaultValue || allOptions[0]);
  }, []);

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={defaultValue || allOptions[0]}
      isDisabled={false}
      isLoading={false}
      isClearable={false}
      isRtl={false}
      isSearchable={false}
      name="color"
      options={allOptions}
      onChange={(e) => handleChange(e)}
      styles={colourStyles}
    />
  );
}
