import { Application } from "express";
import { ArticlesController } from "./article.controller";

export class ArticlesRoutes {
	appExpressInstance: Application;
	articleController: any;

	constructor(app: Application, connection: any) {
		this.appExpressInstance = app;
		this.articleController = new ArticlesController(connection);
	}

	load() {
		this.appExpressInstance.get('/api/articles', this.articleController.findAll);
		this.appExpressInstance.get('/api/articles/:articleId', this.articleController.findOne);
		this.appExpressInstance.post('/api/articles', this.articleController.create);
		this.appExpressInstance.put('/api/articles/:articleId', this.articleController.update);
		this.appExpressInstance.delete('/api/articles/:articleId', this.articleController.delete);
		this.appExpressInstance.get('/api/articles/category/:categoryId', this.articleController.byCategory);
		this.appExpressInstance.get('/api/articles/tag/:tagId', this.articleController.byTag);
		
	}
}