export class CategoryRepository {
  connection: any;

  constructor(connection: any) {
    this.connection = connection;
  }

  async findAllCategories() {
    try {
      const query = 'SELECT * FROM categories';
      const [rows] = await this.connection.query(query);
      return rows;
    } catch (err: any) {
      console.error("Error retrieving categories:", err.message);
      return [];
    }
  }

  async findCategoryById(categoryId: string) {
    try {
      const query = 'SELECT * FROM categories WHERE CategoryID = ?';
      const [rows] = await this.connection.query(query, [categoryId]);
      return rows.length ? rows[0] : null;
    } catch (err: any) {
      console.error("Error retrieving category:", err.message);
      return null;
    }
  }

  async createCategory(title: string) {
    try {
      const query = 'INSERT INTO categories (Title) VALUES (?)';
      const [result] = await this.connection.query(query, [title]);
      const createdCategoryId = result.insertId;

      const createdCategory = await this.findCategoryById(createdCategoryId);
      return createdCategory;
    } catch (err: any) {
      console.error("Error creating category:", err.message);
      return null;
    }
  }

  async updateCategory(categoryId: string, name: string) {
    try {
      const query = 'UPDATE categories SET Title = ? WHERE CategoryID = ?';
      const [result] = await this.connection.query(query, [name, categoryId]);
      const updatedRowCount = result.affectedRows;

      if (updatedRowCount > 0) {
        const updatedCategory = await this.findCategoryById(categoryId);
        return updatedCategory;
      } else {
        return null;
      }
    } catch (err: any) {
      console.error("Error updating category:", err.message);
      return null;
    }
  }

  async deleteCategory(categoryId: string) {
    try {
      const query = 'DELETE FROM categories WHERE CategoryID = ?';
      const [result] = await this.connection.query(query, [categoryId]);
      const deletedRowCount = result.affectedRows;

      if (deletedRowCount > 0) {
        return { categoryId };
      } else {
        return null;
      }
    } catch (err: any) {
      console.error("Error deleting category:", err.message);
      return null;
    }
  }
}
