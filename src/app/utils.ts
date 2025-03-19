export const logger = (message: string): void => {
  console.log(`[Logger] (${new Date().toISOString()}) ${message}`);
};
