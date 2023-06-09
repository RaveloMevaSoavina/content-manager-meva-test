import { Request, Response } from 'express';
import { TagRepository } from './tag.repository';
import { Connection } from 'mysql2';

export class TagController {
  tagRepository: TagRepository;

  constructor(connection: Connection) {
    this.tagRepository = new TagRepository(connection);
  }

  // GET ALL TAGS
  getAllTags = async (req: Request, res: Response) => {
    try {
      const tags = await this.tagRepository.findAllTags();
      return res.json({
        status: "OK",
        message: "Tags successfully retrieved!",
        data: tags
      });
    } catch (err: any) {
      console.error("Error retrieving tags:", err.message);
      return res.json({
        status: "KO",
        message: "Failed to retrieve tags."
      });
    }
  };

  // GET TAG BY ID
  getTagById = async (req: Request, res: Response) => {
    try {
      const { tagId } = req.params;
      const tag = await this.tagRepository.findTagById(tagId);

      if (tag) {
        return res.json({
          status: "OK",
          message: "Tag successfully retrieved!",
          data: tag
        });
      } else {
        return res.json({
          status: "KO",
          message: "Tag not found."
        });
      }
    } catch (err: any) {
      console.error("Error retrieving tag:", err.message);
      return res.json({
        status: "KO",
        message: "Failed to retrieve the tag."
      });
    }
  };

  // CREATE TAG
  createTag = async (req: Request, res: Response) => {
    try {
      const { Title } = req.body;
      const newTag = await this.tagRepository.createTag(Title);

      return res.json({
        status: "OK",
        message: "Tag successfully created!",
        data: newTag
      });
    } catch (err: any) {
      console.error("Error creating tag:", err.message);
      return res.json({
        status: "KO",
        message: "Failed to create the tag."
      });
    }
  };

  // UPDATE TAG
  updateTag = async (req: Request, res: Response) => {
    try {
      const { tagId } = req.params;
      const { Title } = req.body;
      const updatedTag = await this.tagRepository.updateTag(tagId, Title);

      if (updatedTag) {
        return res.json({
          status: "OK",
          message: "Tag successfully updated!",
          data: updatedTag
        });
      } else {
        return res.json({
          status: "KO",
          message: "Tag not found."
        });
      }
    } catch (err: any) {
      console.error("Error updating tag:", err.message);
      return res.json({
        status: "KO",
        message: "Failed to update the tag."
      });
    }
  };

  // DELETE TAG
  deleteTag = async (req: Request, res: Response) => {
    try {
      const { tagId } = req.params;
      const deletedTag = await this.tagRepository.deleteTag(tagId);

      if (deletedTag) {
        return res.json({
          status: "OK",
          message: "Tag successfully deleted!",
          data: deletedTag
        });
      } else {
        return res.json({
          status: "KO",
          message: "Tag not found."
        });
      }
    } catch (err: any) {
      console.error("Error deleting tag:", err.message);
      return res.json({
        status: "KO"
	  })
	}
}
}
