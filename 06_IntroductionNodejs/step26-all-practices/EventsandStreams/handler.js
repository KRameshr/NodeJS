const createhandler = (userdata) => {
  const time = new Date().toLocaleDateString();
  console.log(
    `${time} Event Received: User "${userdata.name}"has connected to the server.`,
  );
};

module.exports = createhandler;
