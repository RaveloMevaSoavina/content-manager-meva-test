import { Application } from "express";
import { TagController } from "./tag.controller";

export class TagRoutes {
  appExpressInstance: Application;
  tagController: TagController;

  constructor(app: Application, connection: any) {
    this.appExpressInstance = app;
    this.tagController = new TagController(connection);
  }

  load() {
    this.appExpressInstance.get("/api/tags", this.tagController.getAllTags);
    this.appExpressInstance.get("/api/tags/:tagId", this.tagController.getTagById);
    this.appExpressInstance.post("/api/tags", this.tagController.createTag);
    this.appExpressInstance.put("/api/tags/:tagId", this.tagController.updateTag);
    this.appExpressInstance.delete("/api/tags/:tagId", this.tagController.deleteTag);
  }
}
