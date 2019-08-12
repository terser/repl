export const getCodeSizeInBytes = code => {
  return new Blob([code], { type: 'text/plain' }).size;
};
