import setupApp from './app';

const port = 3000;

setupApp()
	.then( app => app.listen(port, () => console.log(`Api running on ${port}`)) )
	.catch( err => {
		console.error(err);
		process.exit(1);
	})
