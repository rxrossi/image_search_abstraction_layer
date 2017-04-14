import express from 'express';
import request from 'superagent-es6-promise';
import Query from './models/Queries';
import database from './database';

const app = express();

function queryGoogle(query, offset = 0) {
	const APIKey = "AIzaSyC5aZR8BYfcrVIERrnXIt1zqAzcUkbVxcs";
	const cx = "002877656417845337769:joqv9wcm3la";

	const startIndex = (isNaN(offset) ? 1 : (+offset+1));
	const urlToQuery = `https://www.googleapis.com/customsearch/v1?key=${APIKey}&cx=${cx}&start=${startIndex}&searchType=image&q=${query}`; return request
		.get(urlToQuery)
		.then(response =>{

			const items =	JSON.parse(response.text).items;

			const itemsLessFields = items.map( item => ({
					url: item.link,
					snippet: item.snippet,
					thumbnailUrl: item.image.thumbnailLink,
					context: item.image.contextLink,
					width: item.image.width,
					height: item.image.height,
				}));

			return itemsLessFields
		})
		.catch(err => console.error(err))
}

const configureExpress = () => {

	app.get('/search/:query', (req, res) => {
		queryGoogle(req.params.query, req.query.offset)
			.then(resp => {
				res.send(resp)
			})
			.catch(err => res.send(err))

		Query.create({
			query: req.params.query,
		});
	});

	app.get('/recent', (req, res) => {
			Query
				.find()
				.limit(10)
				.sort({_id: -1})
			.then(result => res.send(result))
			.catch(err => res.send(err))
	})

	return app;
};

export default () => database.connect().then(configureExpress);
