import * as bluebird from 'bluebird';
import * as http from 'http';
// import mongoose from 'mongoose';
import App from './app';

// const options: any = {
//     bufferMaxEntries: 0,
//     connectTimeoutMS: 10000,
//     family: 4,
//     keepAlive: true,
//     poolSize: 10,
//     promiseLibrary: bluebird,
//     socketTimeoutMS: 45000,
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

let connectString;

// console.log(mongoUser);

// if (env !== 'development') {
//     console.log(
//         'Environment is test or production. Actual environment (using appropriate Mongo db):',
//         config.environment,
//     );
//     console.log(`Attempting to connect to ${config.mongoDatabaseName}`);
//     const mongoServer1 = `${config.mongo1}:${config.mongoPort}`;
//     const mongoServer2 = `${config.mongo2}:${config.mongoPort}`;
//     const mongoServer3 = `${config.mongo3}:${config.mongoPort}`;

//     connectString = `mongodb://${config.mongoUser}:${config.mongoPassword}@${mongoServer1},${mongoServer2},${mongoServer3}/${config.mongoDatabaseName}?replicaSet=rs0`;

//     mongoose.connect(connectString, options, (err) => {
//         if (err) {
//             console.error('Error connecting to MongoDB', { error: err });
//             process.exit(1);
//         } else {
//             console.log('Successfully connected to MongoDB');
//         }
//     });
// } else {
//     console.log('using dev mongo connection');

//     const mongoServer1 = `${config.mongo1}:${config.mongoPort}`;

//     connectString = `mongodb://${mongoServer1}/archerapp?authSource=archerapp&w=1`;

//     mongoose.connect(connectString, options, (err) => {
//         if (err) {
//             console.error('Error connecting to MongoDB', { error: err });
//             process.exit(1);
//         } else {
//             console.log('Successfully connected to MongoDB');
//         }
//     });
// }

function normalizePort(val: number | string): number | string | boolean {
    const normalizedPort: number = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(normalizedPort)) {
        return val;
    } else if (normalizedPort >= 0) {
        return normalizedPort;
    } else {
        return false;
    }
}
const port = normalizePort(8080);
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', onError);

function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}

server.on('listening', onListening);