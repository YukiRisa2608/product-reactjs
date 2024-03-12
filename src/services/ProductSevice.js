import api from "../utils/api";

const prefix = "/admin/products"

class ProductService {
    // fetch all product
    getAllProduct() {
        return api().get(prefix)
    }

    // create product
    createProduct(data) {
        return api().post(prefix, data)
    }
}

export default new ProductService();