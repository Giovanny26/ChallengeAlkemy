import axios from "axios";

export default class ProductService{
    baseUrl = "https://api.spoonacular.com/recipes/complexSearch?query="
    search(name){
        return axios.get(this.baseUrl+name+"&number=5"+"&addRecipeInformation=true"+"&apiKey=b20138bdbdb34739be553ca5241eefa4").then(res => res)
    }
    nutrition(id){
        return axios.get("https://api.spoonacular.com/food/menuItems/"+id+"/nutritionWidget").then(res => res)
    }

}
