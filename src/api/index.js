import axios from 'axios';

export default class Api {
    API_KEY = 'ad9cb08f0b66570ea6d73f877b1be0d8';
    

    getResourceData = async (URL) => {
        const response = await axios.get(`https://api.themoviedb.org/3${URL}&api_key=${this.API_KEY}`)
        try {
            return await response.data
        } catch (error) {
            throw new Error(error, response.status)
        }
    }

    getFilms = async (page) => {
        const result = await this.getResourceData(`/movie/popular?page=${page}`)
        return result
    }

    getFilm = async (id) => {
        const result = await this.getResourceData(`/movie/${id}?append_to_response=videos,images`)
              .then(async data => {
                const cast = await this.getResourceData(`/movie/${data.id}/credits?`)
                .catch(() => {return {}})
                return {
                    data,
                    cast
                }
            })
        return result
    }
    
    getPeople = async (page) => {
        const result = await this.getResourceData(`/person/popular?language=en-US&page=${page}`)
        return result
    }

    getPerson = async (id) => {
        const result = await this.getResourceData(`/person/${id}?`)
        return result
    }
}