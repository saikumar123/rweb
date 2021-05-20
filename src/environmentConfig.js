

const dev = {
    //url: 'http://localhost:8080/'
      url:'http://sample.testmycoding.com/api/'
};

const prod = {
    url: 'api/'
};

const config1 = dev;
console.log(config1);

export default { 
    ...config1
};