import axios from "axios";

export default class ProductService{
    baseUrl = "https://api.spoonacular.com/recipes/complexSearch?query="
    search(name){
        return axios.get(this.baseUrl+name+"&number=5"+"&addRecipeInformation=true"+"&apiKey=7ddd50e8051442bc9a33c4c1e6a2cca4").then(res => res)
    }
    nutrition(id){
        return axios.get("https://api.spoonacular.com/food/menuItems/"+id+"/nutritionWidget").then(res => res)
    }

}