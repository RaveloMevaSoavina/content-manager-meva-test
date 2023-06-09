export class TagRepository {
  connection: any;

  constructor(connection: any) {
    this.connection = connection;
  }

  async findAllTags() {
    try {
      const query = 'SELECT * FROM tags';
      const [rows] = await this.connection.query(query);
      return rows;
    } catch (err: any) {
      console.error("Error retrieving tags:", err.message);
      return [];
    }
  }

  async findTagById(tagId: string) {
    try {
      const query = 'SELECT * FROM tags WHERE TagID = ?';
      const [rows] = await this.connection.query(query, [tagId]);
      return rows.length ? rows[0] : null;
    } catch (err: any) {
      console.error("Error retrieving tag:", err.message);
      return null;
    }
  }

  async createTag(Title: string) {
    try {
      const query = 'INSERT INTO tags (Title) VALUES (?)';
      const [result] = await this.connection.query(query, [Title]);
      const createdTagId = result.insertId;

      const createdTag = await this.findTagById(createdTagId);
      return createdTag;
    } catch (err: any) {
      console.error("Error creating tag:", err.message);
      return null;
    }
  }

  async updateTag(tagId: string, Title: string) {
    try {
      const query = 'UPDATE tags SET Title = ? WHERE TagID = ?';
      const [result] = await this.connection.query(query, [Title, tagId]);
      const updatedRowCount = result.affectedRows;

      if (updatedRowCount > 0) {
        const updatedTag = await this.findTagById(tagId);
        return updatedTag;
      } else {
        return null;
      }
    } catch (err: any) {
      console.error("Error updating tag:", err.message);
      return null;
    }
  }

  async deleteTag(tagId: string) {
    try {
      const query = 'DELETE FROM tags WHERE TagID = ?';
      const [result] = await this.connection.query(query, [tagId]);
      const deletedRowCount = result.affectedRows;

      if (deletedRowCount > 0) {
        return { tagId };
      } else {
        return null;
      }
    } catch (err: any) {
      console.error("Error deleting tag:", err.message);
      return null;
    }
  }
}
