import MovieDataModel from './movie-data-model';
import MovieWatchedDataModel from './movie-watched-data-model';

export default class Database {
  private data: MovieDataModel[];
  private data2: MovieWatchedDataModel[];

  constructor() {
    this.data = [];
    this.data2 = [];
  }

  add(movie: MovieDataModel) {
    const ids = this.data.map((e) => e.id);
    if (ids.indexOf(movie.id) === -1) {
      this.data.push(movie);
    }
  }

  addWatched(movie: MovieWatchedDataModel) {
    const ids = this.data2.map((e) => e.id);
    if (ids.indexOf(movie.id) === -1) {
      this.data2.push(movie);
    }
  }

  getAllIds() {
    return this.data.map((e) => e.id);
  }

  getAllWatchedIds() {
    return this.data2.map((e) => e.id);
  }
}
