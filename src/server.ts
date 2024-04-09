import http from 'http';
import app from './index';

const normalizePort = (val: string): number | string | void => {
	const port = parseInt(val, 10);

	if ( isNaN(port) ) {
		// named pipe
		return val;
	}

	if ( port >= 0 ) {
		return port;
	}


};

const onError = (error: NodeJS.ErrnoException): void => {
	if ( error.syscall !== 'listen' ) {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	switch ( error.code ) {
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
};

const onListening = (): void => {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `pipe ${ addr }` : `port ${ addr?.port }`;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
