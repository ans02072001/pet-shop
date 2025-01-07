import { Request, Response } from "express";
import AnimalsService from "../services/AnimalsService";
import Animal from "../models/AnimalModel";

class AnimalsController {
  private service: AnimalsService;

  constructor() {
    this.service = new AnimalsService();
  }

  public async getAnimalsByKind(req: Request, res: Response): Promise<Response> {
    try {
      const kind = req.params.kind;
      const animals = await this.service.getAllByKind(kind);

      if (animals.length === 0) {
        return res.status(404).json({ message: "No animals found for this kind." });
      }

      return res.status(200).json(animals);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getAnimalById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const animal = await this.service.getAnimalById(id);

      if (!animal) {
        return res.status(404).json({ message: "Animal not found" });
      }

      return res.status(200).json(animal);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Add animal (example)
  public async addAnimal(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, kind, age } = req.body;
      const newAnimal = await this.service.addAnimal({ name, price, kind, age });

      return res.status(201).json(newAnimal);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete animal (example)
  public async deleteAnimal(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await this.service.deleteAnimalById(id);

      if (!deleted) {
        return res.status(404).json({ message: "Animal not found" });
      }

      return res.status(200).json({ message: "Animal deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AnimalsController;
