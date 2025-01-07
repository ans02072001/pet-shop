import request from "supertest";
import app from "../app";

describe("AnimalsController", () => {
  it("should add a new animal", async () => {
    const res = await request(app)
      .post("/api/animals")
      .send({ id: 1, name: "Fluffy", price: 50, kind: "cat", age: 2 });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Fluffy");
  });

  it("should return 400 if required fields are missing when adding an animal", async () => {
    const res = await request(app)
      .post("/api/animals")
      .send({ id: 1, name: "Fluffy", price: 50, kind: "cat" }); // Missing 'age'
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required.");
  });

  it("should fetch all animals of a kind", async () => {
    const res = await request(app).get("/api/animals/cat");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Array));
  });

  it("should fetch an animal by ID", async () => {
    const res = await request(app).get("/api/animals/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it("should return 404 for an invalid animal ID", async () => {
    const res = await request(app).get("/api/animals/9999");
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Animal not found.");
  });

  it("should return 404 for non-existent animal kind", async () => {
    const res = await request(app).get("/api/animals/elephant");
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("No animals found for the given kind.");
  });

  it("should successfully delete an animal", async () => {
    const res = await request(app).delete("/api/animals/1");
    expect(res.statusCode).toBe(204); // No content
  });

  it("should return 404 for a non-existent animal when deleting", async () => {
    const res = await request(app).delete("/api/animals/9999");
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Animal not found.");
  });

  it("should return 400 if invalid ID format is provided", async () => {
    const res = await request(app).get("/api/animals/abc");
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid ID format.");
  });

  it("should return 400 if invalid ID format is provided for deletion", async () => {
    const res = await request(app).delete("/api/animals/abc");
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid ID format.");
  });

  it("should return a valid response structure when fetching animals by kind", async () => {
    const res = await request(app).get("/api/animals/cat");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          kind: expect.any(String),
          age: expect.any(Number),
        }),
      ])
    );
  });
});
