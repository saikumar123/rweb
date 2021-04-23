

const dev = {
    url: 'http://sample.testmycoding.com/'
};

const stage = {
    url: 'http://localhost:8081'
};



const prod = {
    url: ''
};

const config1 = process.env.REACT_APP_STAGE === 'dev' ? dev : prod;

export default { 
    ...config1
};