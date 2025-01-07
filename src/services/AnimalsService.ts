import Animal from "../models/AnimalModel";

class AnimalsService {
  async getAllByKind(kind: string) {
    return Animal.findAll({ where: { kind } });
  }

  async getAnimalById(id: number) {
    return Animal.findByPk(id);
  }

  async addAnimal(animalData: { name: string; price: number; kind: string; age: number }) {
    const animal = await Animal.create(animalData);
    return animal;
  }

  async deleteAnimalById(id: number) {
    const animal = await Animal.findByPk(id);
    if (animal) {
      await animal.destroy();
      return true;
    }
    return false;
  }
}

export default AnimalsService;
