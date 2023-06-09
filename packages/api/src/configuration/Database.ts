import mysql from 'mysql2/promise'

export class Database {
	config: any;
	connection: any;

	constructor(config: any) {
	  this.config = config;
	  this.connection = null;
	}
  
	async connect() {
	  try {
		this.connection = await mysql.createConnection(this.config);
		console.log("Database Connected...");
		await this.createTables(); // Call the method to create tables
		// console.log(this.connection)
		return this.connection;
	  } catch (err: any) {
		console.log(err.message);
	  }
	}
  
	async close() {
	  try {
		await this.connection.end();
		console.log("Database Connection Closed...");
	  } catch (err: any) {
		console.log(err.message);
	  }
	}

	async createTables() {
		try {
		  const createArticlesTableQuery = `CREATE TABLE IF NOT EXISTS articles (
			ArticleID INT PRIMARY KEY AUTO_INCREMENT,
			PublishDate DATE,
			Title VARCHAR(255),
			Reporter VARCHAR(255),
			Body TEXT,
			CategoryID INT,
			FOREIGN KEY (CategoryID) REFERENCES categories(CategoryID)
		  )`;
	  
		  const createCategoriesTableQuery = `CREATE TABLE IF NOT EXISTS categories (
			CategoryID INT PRIMARY KEY AUTO_INCREMENT,
			Title VARCHAR(255)
		  )`;
	  
		  const createTagsTableQuery = `CREATE TABLE IF NOT EXISTS tags (
			TagID INT PRIMARY KEY AUTO_INCREMENT,
			Title VARCHAR(255)
		  )`;

		  const createArticleTagsTableQuery = `CREATE TABLE IF NOT EXISTS article_tags (
			ArticleID INT,
			TagID INT,
			FOREIGN KEY (ArticleID) REFERENCES articles(ArticleID),
			FOREIGN KEY (TagID) REFERENCES tags(TagID),
			PRIMARY KEY (ArticleID, TagID)
		  )`;
	  
	  
		  await this.connection.execute(createCategoriesTableQuery);
		  await this.connection.execute(createTagsTableQuery);
		  await this.connection.execute(createArticlesTableQuery);
		  await this.connection.execute(createArticleTagsTableQuery);
		  
		  console.log("Tables created successfully.");
		} catch (err: any) {
		  console.log("Error creating tables:", err.message);
		}
	}

	getConnectionInstance() {
		return this.connection;
	}
}



  