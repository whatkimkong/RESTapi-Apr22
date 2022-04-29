import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    maxPoolSize: 50,
    autoIndex: false,
}

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'local';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'local';
const MONGO_HOST = process.env.MONGO_URL || 'theone-shard-00-00.5cgxh.mongodb.net:27017,theone-shard-00-01.5cgxh.mongodb.net:27017,theone-shard-00-02.5cgxh.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-hw0agk-shard-0&authSource=admin&retryWrites=true&w=majority';

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 27017;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;