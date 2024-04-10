// Define and export ProductModel class for managing products data
export default class ProductModel {

  // Constructor to initialize product properties
  constructor(_id, _name, _description, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.description = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }

  // Get all products
  static getAll() {
    return products;
  }

  // Add new product
  static add(newProductObj) {
    const newProduct = new ProductModel(
      products.length + 1,
      newProductObj.name,
      newProductObj.description,
      newProductObj.price,
      newProductObj.imageUrl
    );

    products.push(newProduct);
  }

  // Update existing product
  static update(updatedProduct) {
    const index = products.findIndex((product) => product.id == updatedProduct.id);
    products[index] = updatedProduct;
    return true;
  }

  // Delete exsiting product
  static delete(id) {
    const index = products.findIndex((product) => product.id == id);
    products.splice(index, 1);
    return true;
  }

  // Get product with id
  static getById(id) {
    return products.find((product) => product.id == id);
  }

  // Check if product exists
  static exists(id) {
    return products.some((product) => product.id == id);
  }
}

// Array of products
var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19.99,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29.99,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39.99,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg'
  ),
];
