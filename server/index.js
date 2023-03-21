import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

// allows us to pull dotenv variables from the dotenv file
dotenv.config();

const app = express();

// add middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// create routes
app.get('/', async (req, res) => {
	res.send('Hello from DALL-E!');
});

// run the server
const startServer = async () => {
	// before we start port 8080, connect o mongoDb first
	// apply a try catch if because it can fail
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(8080, () =>
			console.log('Server has started on port http://localhost:8080')
		);
	} catch (error) {
		console.log(error);
	}
};

startServer();
