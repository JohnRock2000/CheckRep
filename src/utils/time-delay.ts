export const timeDelay = (timeMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
};
