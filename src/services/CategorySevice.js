import api from "../utils/api";

const prefix = "/admin/categories"

class CategorySevice {
    getAllCategories() {
        return api().get(prefix)
    }
}

export default new CategorySevice();