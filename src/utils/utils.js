const randomNumber = () => {
  const random = `${Math.floor(Date.now() * Math.random())}`;
  return random.substring(2, 9);
};

module.exports = {
  randomNumber,
};
