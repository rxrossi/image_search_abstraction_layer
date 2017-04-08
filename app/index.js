import express from 'express';
import request from 'superagent';

const app = express();

function queryGoogle(query, offset = 0) {
	const APIKey = "AIzaSyC5aZR8BYfcrVIERrnXIt1zqAzcUkbVxcs";
	const cx = "002877656417845337769:joqv9wcm3la";

	const startIndex = (isNaN(offset) ? 1 : (+offset+1));
	const urlToQuery = `https://www.googleapis.com/customsearch/v1?key=${APIKey}&cx=${cx}&start=${startIndex}&searchType=image&q=${query}`;

	return request
		.get(urlToQuery)
}

app.get('/search/:query', (req, res) => {
	queryGoogle(req.params.query, req.query.offset)
		.end((err, response) =>{

			if (err) {
				console.error("Could not get from Google", err);
				res.send('Could not fetch results from Google, their API response was: \n' + err + '\n' + response.text)
				return;
			}

			const items =	JSON.parse(response.text).items;

			const itemsLessFields = items.map( item => ({
					url: item.link,
					snippet: item.snippet,
					thumbnailUrl: item.image.thumbnailLink,
					context: item.image.contextLink,
					width: item.image.width,
					height: item.image.height,
				}));

			res.send(
				itemsLessFields
			);
		});
});

export default app;
