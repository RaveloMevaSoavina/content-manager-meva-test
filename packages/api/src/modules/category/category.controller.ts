import { Request, Response } from 'express';
import { CategoryRepository } from './category.repository';
import { Connection } from 'mysql2';

export class CategoryController {
  categoryRepository: CategoryRepository;

  constructor(connection: Connection) {
    this.categoryRepository = new CategoryRepository(connection);
  }

  // GET ALL CATEGORIES
  getAllCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryRepository.findAllCategories();
      return res.json({
        status: "OK",
        message: "Categories successfully retrieved!",
        data: categories
      });
    } catch (err: any) {
      console.error("Error retrieving categories:", err.message);
      return res.json({
        status: "KO",
        message: "Failed to retrieve categories."
      });
    }
  };

  // GET CATEGORY BY ID
  getCategoryById = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const category = await this.categoryRepository.findCategoryById(categoryId);

      if (category) {
        return res.json({
          status: "OK",
          message: "Category successfully retrieved!",
          data: category
        });
      } else {
        return res.json({
          status: "KO",
          message: "Category not found."
        });
      }
    } catch (err: any) {
      console.error("Error retrieving category:", err.message);
      return res.json({
        status: "KO",
        message: "Failed to retrieve the category."
      });
    }
  };

  // CREATE CATEGORY
  createCategory = async (req: Request, res: Response) => {
    try {
      const { Title } = req.body;
      const newCategory = await this.categoryRepository.createCategory(Title);

      return res.json({
        status: "OK",
        message: "Category successfully created!",
        data: newCategory
      });
    } catch (err: any) {
      console.error("Error creating category:", err.message);
      return res.json({
        status: "KO",
        message: "Failed to create the category."
      });
    }
  };

  // UPDATE CATEGORY
  updateCategory = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const { Title } = req.body;
      const updatedCategory = await this.categoryRepository.updateCategory(categoryId, Title);

      if (updatedCategory) {
        return res.json({
          status: "OK",
          message: "Category successfully updated!",
          data: updatedCategory
        });
      } else {
        return res.json({
          status: "KO",
          message: "Category not found."
        });
      }
    } catch (err: any) {
      console.error("Error updating category:", err.message);
      return res.json({
        status: "KO",
        message: "Failed to update the category."
      });
    }
  };

  // DELETE CATEGORY
  deleteCategory = async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const deletedCategory = await this.categoryRepository.deleteCategory(categoryId);

      if (deletedCategory) {
        return res.json({
          status: "OK",
          message: "Category successfully deleted!",
          data: deletedCategory
        });
      } else {
        return res.json({
          status: "KO",
          message: "Category not found."
        });
      }
    } catch (err: any) {
      console.error("Error deleting category:", err.message);
      return res.json({
        status: "KO",
        message: "Failed to delete"
	  })
	}
  }
}
