import mongoose from 'mongoose';

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/image_api';

mongoose.Promise = global.Promise;

const connect = () => mongoose.connect(mongodbUrl) ;

export default {
	connect
}
