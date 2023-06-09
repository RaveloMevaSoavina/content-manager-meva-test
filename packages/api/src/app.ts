import { config } from 'dotenv';
import express, { Application } from 'express';
import { ArticlesRoutes } from './modules/article/article.route';
import { Database } from './configuration/Database'
import { CategoryRoutes } from './modules/category/category.route';
import { TagRoutes } from './modules/tags/tag.route';
import cors from 'cors';

config();

export const configuration = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
};


const app: Application = express();

app.use(express.json());
app.use(cors({
    origin : '*'
}))

const connection = new Database(configuration); 
connection.connect().then(con => {
    const articleRoutes = new ArticlesRoutes(app, con)
    const categoryRoutes = new CategoryRoutes(app, con)
    const tagRoutes = new TagRoutes(app, con)
    articleRoutes.load();
    categoryRoutes.load();
    tagRoutes.load();
}) 


const PORT = process.env.API_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

async function killProcess() {
    await (await connection).connection.close();
    process.exit(0);
}

process.on('SIGINT', killProcess);
process.on('SIGTERM', killProcess);
process.on('SIGUSR2', killProcess);
process.on('uncaughtException', killProcess);


