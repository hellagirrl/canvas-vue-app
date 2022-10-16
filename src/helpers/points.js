const rectSize = 100;

export const changeCirclePosition = (num, axis, index) => {
  if (axis === "x") {
    switch (index) {
      case 0:
        return num + rectSize / 2;
      case 1:
        return num + 12 + rectSize;
      case 2:
        return num + rectSize / 2;
      case 3:
        return num - 12;
    }
  } else {
    switch (index) {
      case 0:
        return num - 12;
      case 1:
        return num + rectSize / 2;
      case 2:
        return num + 12 + rectSize;
      case 3:
        return num + rectSize / 2;
    }
  }
};
