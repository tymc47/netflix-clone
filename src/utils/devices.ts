const size = {
  small: "350px",
  medium: "550px",
  mediumLarge: "750px",
  large: "950px",
};

const devices = {
  small: `(max-width: ${size.small})`,
  medium: `(max-width: ${size.medium})`,
  mediumLarge: `(max-width: ${size.mediumLarge})`,
  large: `(max-width: ${size.large})`,
};

export default devices;
