const dev = {
  url: "http://localhost:8080/",
  // url: "http://sample.testmycoding.com/api/",
};

const prod = {
  url: "api/",
};

const config1 = process.env.REACT_APP_STAGE === "dev" ? dev : prod;

export default {
  ...config1,
};
