import axios from "axios";

const movieDB = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie",
    params : {
        api_key: "a087a9ad0de395ea9b3e6be2b2a0f01d",
        language : "es-ES"
    }
})

export default movieDB