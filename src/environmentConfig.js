const dev = {
  url: "http://localhost:8080/",
};
const prod = {
  url: "api/",
};

const config1 = process.env.REACT_APP_STAGE === "dev" ? dev : prod;

export default {
  ...config1,
};
