export const closeGracefully = async (server: any) => {
  let isClosed = false;
  const closeGracefully = async (signal: NodeJS.Signals) => {
    if (isClosed) return;
    console.warn(`Closing as a result of signal: ${signal}.`);
    isClosed = true;
    server.close();
    process.exit(0);
  };

  // handle Ctrl-C, nodemon restart, and Docker stop
  ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2', 'exit'].forEach((signal) => {
    process.on(signal, closeGracefully);
  });
};
