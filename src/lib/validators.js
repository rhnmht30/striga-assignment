export const isString = (val) => {
  return typeof val === 'string';
};

export const isNonEmptyString = (val) => {
  return isString(val) && val?.length > 0;
};

export const isNumber = (val) => {
  return (
    (isNonEmptyString(val) && !isNaN(Number(val))) ||
    (typeof val === 'number' && !isNaN(val))
  );
};

export const in200s = (statusCode) => {
  return statusCode >= 200 && statusCode < 300;
};

export const in400s = (statusCode) => {
  return statusCode >= 400 && statusCode < 500;
};

export const in500s = (statusCode) => {
  return statusCode >= 500 && statusCode < 600;
};

export const isNonEmptyObject = (obj) => {
  if (obj && typeof obj === 'object' && Object.keys(obj)?.length > 0) {
    return true;
  }

  return false;
};

export const isNonEmptyArray = (arr) => {
  if (typeof arr === 'object' && arr instanceof Array && arr?.length > 0) {
    return true;
  }

  return false;
};

export const isArray = (arr) => {
  if (typeof arr === 'object' && arr instanceof Array) {
    return true;
  }

  return false;
};
