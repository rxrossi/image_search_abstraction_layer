import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const querySchema = new Schema ({
	query: {
		type: String,
		required: true,
	},
	date: {
			type: Date,
			default: Date.now,
	}
});

export default mongoose.model('Query', querySchema);
