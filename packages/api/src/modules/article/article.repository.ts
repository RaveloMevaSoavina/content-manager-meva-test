export class ArticlesRepository {
	connection: any;

	constructor(connection: any) {
		this.connection = connection;
	}

	async findAll() {
		try {
			const query = 'SELECT * FROM articles';
			const [rows] = await this.connection.query(query)
			return rows;
		  } catch (err: any) {
			console.log("Error retrieving articles:", err.message);
			return [];
		  }
	}

	async findOne(id: number) {
		try {
		  const query = 'SELECT * FROM articles WHERE ArticleID = ?';
		  console.log(query, id)
		  const [rows] = await this.connection.query(query, [id]);
		  return rows.length ? rows[0] : null;
		} catch (err: any) {
		  console.log("Error retrieving article:", err.message);
		  return null;
		}
	}

	async create(body: any) {
		try {
			const { PublishDate, Title, Reporter, Body, CategoryID } = body

			if (!PublishDate || !Title || !Reporter || !Body || !CategoryID) {
				throw new Error("Invalid input. All fields are required.");
			  }
		  
			const query = 'INSERT INTO articles (Title, Reporter, Body, PublishDate, CategoryID) VALUES (?, ?, ?, ?, ?)';
			const [result] = await this.connection.query(
				query, 
				[ Title, Reporter, Body, PublishDate, CategoryID]);
			const createdArticleId = result.insertId;
			
			const createdArticle = await this.findOne(createdArticleId);
			return createdArticle;
		} catch (err: any) {
		  console.log("Error creating article:", err.message);
		  return null;
		}
	}

	async delete(articleId: number) {
		try {
			const query = 'DELETE FROM articles WHERE ArticleID = ?';
			const [result] = await this.connection.query(query, [articleId]);
			const deletedRowCount = result.affectedRows;
		  
			if (deletedRowCount > 0) {
			return { articleId };
			} else {
			return null;
			}
		} catch (err: any) {
			console.log("Error deleting article:", err.message);
			return null;
		}
	}

	async update(articleId: number, articleData: any) {
		try {
		  const { Title, Reporter, Body, CategoryID } = articleData;
		  const query = 'UPDATE articles SET Title = ?, Reporter = ?, Body = ?, CategoryID = ? WHERE ArticleID = ?';
		  const [result] = await this.connection.query(query, [Title, Reporter, Body, CategoryID, articleId ]);
		  const updatedRowCount = result.affectedRows;
		  
		  if (updatedRowCount > 0) {
			const updatedArticle = await this.findOne(articleId);
			return updatedArticle;
		  } else {
			return null;
		  }
		} catch (err: any) {
		  console.log("Error updating article:", err.message);
		  return null;
		}
	}

		// ArticlesRepository
	async findByCategory(categoryId: number) {
		try {
		const query = 'SELECT * FROM articles WHERE CategoryID = ?';
		const [rows] = await this.connection.query(query, [categoryId]);
		return rows;
		} catch (err: any) {
		console.log("Error retrieving articles by category:", err.message);
		return [];
		}
	}
	
	async findByTag(tagId: string) {
		try {
		  const query = 'SELECT articles.* FROM articles INNER JOIN article_tags ON articles.ArticleID = article_tags.ArticleID WHERE article_tags.TagID = ?';
		  const [rows] = await this.connection.query(query, [tagId]);
		  return rows;
		} catch (err: any) {
		  console.log("Error retrieving articles by tag:", err.message);
		  return [];
		}
	  }	  

}