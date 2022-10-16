import { Hover_Color } from "constants";
import { Color_Main } from "constants";

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",
});

export const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    boxShadow: "0px",
    // borderColor: `#cccccc`,
    ":active": {
      boxShadow: `0 0 0 1px ${Color_Main}`,
      // borderColor: `${Color_Main}`,
    },
    ":hover": {
      boxShadow: `0 0 0 1px ${Color_Main}`,
      // borderColor: `${Color_Main}`,
    },
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: 5,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? Color_Main
        : isFocused
        ? Hover_Color
        : undefined,
      color: isDisabled
        ? ""
        : isSelected
        ? true
          ? "white"
          : "black"
        : "black",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? (isSelected ? "" : "") : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot("#111") }),
};
