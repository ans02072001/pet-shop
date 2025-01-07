import AnimalsService from "../services/AnimalsService";
import Animal from "../models/AnimalModel"; // Sequelize model import
import sequelize from "../utils/database"; // Import your sequelize instance for setup and teardown

describe("AnimalsService", () => {
  let service: AnimalsService;
  let animalInstance: any; // Sequelize model instance

  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Ensure the DB is fresh before tests
    service = new AnimalsService();
  });

  beforeEach(async () => {
    // Use Sequelize to create an animal instance in the database
    animalInstance = await Animal.create({
      id: 1,
      name: "Fluffy",
      price: 50,
      kind: "cat",
      age: 2,
    });
  });

  afterEach(async () => {
    await Animal.destroy({ where: {} }); // Clean up database after each test
  });

  it("should add an animal", async () => {
    const animals = await service.getAllByKind("cat");
    expect(animals).toContainEqual(expect.objectContaining({
      id: animalInstance.id, // Use the instance ID from the Sequelize model
      name: "Fluffy",
      price: 50,
      kind: "cat",
      age: 2
    }));
  });

  it("should fetch an animal by ID", async () => {
    const fetchedAnimal = await service.getAnimalById(animalInstance.id);
    expect(fetchedAnimal?.id).toBe(animalInstance.id);
    expect(fetchedAnimal?.name).toBe("Fluffy");
  });

  it("should delete an animal by ID", async () => {
    await service.deleteAnimalById(animalInstance.id);
    const deletedAnimal = await service.getAnimalById(animalInstance.id);
    expect(deletedAnimal).toBeNull(); // After deletion, animal should not exist
  });
});
