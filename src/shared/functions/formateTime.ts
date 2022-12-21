export const formateTime = (time: number) => {
  return Intl.DateTimeFormat().format(time);
};
