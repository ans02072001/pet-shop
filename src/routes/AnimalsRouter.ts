import express from "express";
import AnimalsController from "../controllers/AnimalsController";

const router = express.Router();
const animalsController = new AnimalsController();

// Route for fetching animals by kind
router.get("/animals/:kind", (req, res) =>
  animalsController.getAnimalsByKind(req, res) // Matches controller method name
);

// Route for fetching an animal by ID
router.get("/animal/:id", (req, res) =>
  animalsController.getAnimalById(req, res) // Matches controller method name
);

// Route for adding a new animal
router.post("/animals", (req, res) =>
  animalsController.addAnimal(req, res) // Ensure addAnimal exists in the controller
);

// Route for deleting an animal by ID
router.delete("/animal/:id", (req, res) =>
  animalsController.deleteAnimal(req, res) // Ensure deleteAnimal exists in the controller
);

export default router;
