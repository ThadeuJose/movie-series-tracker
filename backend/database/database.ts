import MovieDataModel from "./movie-data-model";

export default class Database {
    private data: MovieDataModel[];

    constructor() {
        this.data = new Array();
    }

    add(movie:MovieDataModel){      
        const ids = this.data.map(e => e.id);
        if(ids.indexOf(movie.id) === -1){
            this.data.push(movie);
        }  
    }

    getAllIds(){
        return this.data.map(e => e.id);
    }
}