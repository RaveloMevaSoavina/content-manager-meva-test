import { Request, Response } from 'express';
import { ArticlesRepository } from './article.repository';
import { Connection } from 'mysql2';


export class ArticlesController {
	articlesRepository: any

	constructor(connection: any) {
		this.articlesRepository = new ArticlesRepository(connection)
		this.findAll = this.findAll.bind(this); // Bind the method to the class instance
		this.findOne = this.findOne.bind(this); // Bind the method to the class instance
		this.create = this.create.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
		this.byCategory = this.byCategory.bind(this);
		this.byTag = this.byTag.bind(this);
	}

	// GET ALL
	async findAll(req: Request, res: Response) {
		try {
			const articles = await this.articlesRepository.findAll();
			if (articles) {
				return res.json({ 
					status: "OK",
					message: "Articles successfully retrieved!",
					data: articles
				});
			}
		} catch(err: any) {
			return res.json({ 
				status: "KO",
				message: "Failed to retrieve articles."
			  });
		
		}
	}

	async findOne(req: Request, res: Response) {
		try {
		  const { articleId } = req.params;
		  const article = await this.articlesRepository.findOne(articleId);
	
		  if (article) {
			return res.json({ 
			  status: "OK",
			  message: "Article successfully retrieved!",
			  data: article
			});
		  } else {
			return res.json({ 
			  status: "KO",
			  message: "Article not found."
			});
		  }
		} catch (err) {
		  return res.json({ 
			status: "KO",
			message: "Failed to retrieve the article."
		  });
		}
	}

	// CREATE
	async create(req: Request, res: Response) {
		try {
			const article = await this.articlesRepository.create({ ...req.body, PublishDate: new Date() });
			return res.json({
				status: "OK",
				message: "Article successfully created!",
				data: article
			})

		} catch (err) {
			return res.json({
			status: "KO",
			message: "Failed to create the article."
			});
		}
	}

	// DELETE
	async delete(req: Request, res: Response) {
		try {
		  const { articleId } = req.params;
		  const deletedArticle = await this.articlesRepository.delete(articleId);
		  
		  if (deletedArticle) {
			return res.json({
			  status: "OK",
			  message: "Article successfully deleted!",
			  data: deletedArticle
			});
		  } else {
			return res.json({
			  status: "KO",
			  message: "Article not found."
			});
		  }
		} catch (err) {
		  return res.json({
			status: "KO",
			message: "Failed to delete the article."
		  });
		}
	  }

	// UPDATE
	async update(req: Request, res: Response) {
		try {
		const { articleId } = req.params;
		const updatedArticle = await this.articlesRepository.update(articleId, { ...req.body });
		
		if (updatedArticle) {
			return res.json({
			status: "OK",
			message: "Article successfully updated!",
			data: updatedArticle
			});
		} else {
			return res.json({
			status: "KO",
			message: "Article not found."
			});
		}
		} catch (err) {
		return res.json({
			status: "KO",
			message: "Failed to update the article."
		});
		}
	}

	// BY CATEGORY
	async byCategory(req: Request, res: Response) {
		try {
			const { categoryId } = req.params;
			console.log(categoryId)
			const articles = await this.articlesRepository.findByCategory(categoryId);
			console.log(articles)
			
			return res.json({
				status: "OK",
				message: "Articles successfully retrieved by category!",
				data: articles
			});
		} catch (err: any) {
			return res.json({
				status: "KO",
				message: "Failed to retrieve articles by category." + err
			});
		}
	}
	

	// BY TAG
	async byTag(req: Request, res: Response) {
		try {
		const { tagId } = req.params;
		const articles = await this.articlesRepository.findByTag(tagId);
		
		return res.json({
			status: "OK",
			message: "Articles successfully retrieved by tag!",
			data: articles
		});
		} catch (err: any) {
		return res.json({
			status: "KO",
			message: "Failed to retrieve articles by tag."
		});
		}
	}
}
