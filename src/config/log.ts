const getTimeStamp = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string , obj?: any) => {
    if (obj) {
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, obj);
    } else {
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};

const warn = (namespace: string, message: string, obj?: any) => {
    if (obj) {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, obj);
    } else {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
    }
};

const error = (namespace: string, message: string, obj?: any) => {
    if (obj) {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, obj);
    } else {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
    }
};

const debug = (namespace: string, message: string, obj?: any) => {
    if (obj) {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, obj);
    } else {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }
};

export default {
    info,
    warn,
    error,
    debug
};
