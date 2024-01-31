import * as chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../src/app.js";

chai.should();
chai.use(chaiHttp);

describe("Products API", () => {
  describe("GET /api/product/latest", () => {
    it("GET /latest --> array products", async () => {
      const response = await chai.request(app).get("/api/product/latest");
      response.should.have.status(200);
      response.body.should.be.an("array");
    });
  });

  describe("GET /api/product/search", () => {
    it("GET /search --> specific product by query", async () => {
      const query = "search_query";

      const response = await chai
        .request(app)
        .get(`/api/product/search?query=${query}`);

      response.should.have.status(200);
      response.body.should.be.an("object");
    });

    it("GET /search --> 404 if not found", async () => {
      const nonExistentQuery = "non_existent_query";

      const response = await chai
        .request(app)
        .get(`/api/product/search?query=${nonExistentQuery}`);

      response.should.have.status(404);
    });
  });

  describe("POST /api/product/create", () => {
    it("POST /create --> created product", async () => {
      const productData = {
        description: "Product description",
        name: "Product name",
        price: 100.0,
        variants: [
          {
            name: "Variant name",
            sku: "Variant SKU",
            additionalCost: 5.0,
            stockCount: 10,
          },
        ],
      };

      const response = await chai
        .request(app)
        .post("/api/product/create")
        .send(productData);

      response.should.have.status(201);
      response.body.should.be.an("object");
      response.body.should.deep.include(productData);
    });
  });

  describe("PATCH /api/product/update/:id", () => {
    it("PATCH /update/id --> updated product", async () => {
      const productId = "product_id";
      const updatedData = {
        description: "Updated Product description",
        name: "Updated Product name",
        price: 120.0,
        variants: [
          {
            name: "Updated Variant name",
            sku: "Updated Variant SKU",
            additionalCost: 10.0,
            stockCount: 20,
          },
        ],
      };

      const response = await chai
        .request(app)
        .patch(`/api/product/update/${productId}`)
        .send(updatedData);

      response.should.have.status(200);
      response.body.should.be.an("object");
      response.body.should.deep.include(updatedData);
    });

    it("PATCH /update/id --> 404 if not found", async () => {
      const nonExistentId = "9999";

      const response = await chai
        .request(app)
        .patch(`/api/product/update/${nonExistentId}`)
        .send({});

      response.should.have.status(404);
    });
  });

  describe("DELETE /api/product/delete/:id", () => {
    it("DELETE /delete/id --> deleted product", async () => {
      const productId = "product_id";
      const response = await chai
        .request(app)
        .delete(`/api/product/delete/${productId}`);

      response.should.have.status(200);
      response.body.should.be.an("object");
    });

    it("DELETE /delete/id --> 404 if not found", async () => {
      const nonExistentId = "9999";

      const response = await chai
        .request(app)
        .delete(`/api/product/delete/${nonExistentId}`);

      response.should.have.status(404);
    });
  });
});
