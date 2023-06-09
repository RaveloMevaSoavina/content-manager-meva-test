import { Application } from "express";
import { CategoryController } from "./category.controller";

export class CategoryRoutes {
  appExpressInstance: Application;
  categoryController: CategoryController;

  constructor(app: Application, connection: any) {
    this.appExpressInstance = app;
    this.categoryController = new CategoryController(connection);
  }

  load() {
    this.appExpressInstance.get("/api/categories", this.categoryController.getAllCategories);
    this.appExpressInstance.get("/api/categories/:categoryId", this.categoryController.getCategoryById);
    this.appExpressInstance.post("/api/categories", this.categoryController.createCategory);
    this.appExpressInstance.put("/api/categories/:categoryId", this.categoryController.updateCategory);
    this.appExpressInstance.delete("/api/categories/:categoryId", this.categoryController.deleteCategory);
  }
}
