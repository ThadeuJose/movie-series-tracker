import {
  MovieDetail,
  Cast,
  Movie,
  Pagination,
  Tv,
  Detail,
  Episode as EpisodeResult,
} from './types';
import {
  MovieDetail as MovieDetailResult,
  Cast as CastResult,
  MovieDiscoverResult,
  TvDiscoverResult,
  SeasonResult,
  Episode,
  TvDetailResult,
  LastEpisodeToAir,
} from './themoviedb-api-types';

export class Formatter {
  static formatResult<T, K>(
    data: Pagination<T>,
    transformer: (data: T) => K,
  ): Pagination<K> {
    return {
      page: data.page,
      results: data.results.map(transformer),
      total_pages: data.total_pages,
      total_results: data.total_results,
    };
  }

  static formatTv(data: TvDiscoverResult): Tv {
    return {
      id: data.id,
      title: data.name,
      vote: Formatter.formatVote(data.vote_average),
      image: Formatter.formatPoster(data.poster_path),
    };
  }

  static formatTvDetail(data: TvDetailResult): Detail {
    return {
      id: data.id,
      title: data.name,
      vote: Formatter.formatVote(data.vote_average),
      image: Formatter.formatImage(data.poster_path),
      last_episode_to_air: Formatter.formatLastEpisode(
        data.last_episode_to_air,
      ),
      next_episode_to_air: Formatter.formatNextEpisode(
        data.next_episode_to_air,
      ),
      synopsis: data.overview,
    };
  }

  static formatSeason(data: SeasonResult) {
    return {
      id: data.id,
      name: data.name,
      vote: Formatter.formatVote(data.vote_average),
      episodes: data.episodes
        .filter((value) => value !== null)
        .map(Formatter.formatEpisode),
    };
  }

  static formatEpisode(data: Episode): EpisodeResult {
    return {
      id: data.id,
      name: data.name,
      number: data.episode_number,
      image: Formatter.formatImage(data.still_path),
      runtime: data.runtime,
      air_date: data.air_date,
    };
  }

  static formatLastEpisode(data: LastEpisodeToAir): EpisodeResult | null {
    return {
      id: data.id,
      name: data.name,
      number: data.episode_number,
      image: Formatter.formatImage(data.still_path),
      runtime: data.runtime,
      air_date: data.air_date,
    };
  }

  static formatNextEpisode(data: LastEpisodeToAir): EpisodeResult | null {
    if (data === null) {
      return null;
    }
    return {
      id: data.id,
      name: data.name,
      number: data.episode_number,
      image: Formatter.formatImage(data.still_path),
      runtime: data.runtime,
      air_date: data.air_date,
    };
  }

  static formatMovie(data: MovieDiscoverResult): Movie {
    return {
      id: data.id,
      title: data.title,
      vote: Formatter.formatVote(data.vote_average),
      image: Formatter.formatPoster(data.poster_path),
    };
  }

  static formatMovieDetail(data: MovieDetailResult): MovieDetail {
    return {
      id: data.id,
      title: data.title,
      synopsis: data.overview,
      image: Formatter.formatPoster(data.poster_path),
      runtime: data.runtime,
      vote: Formatter.formatVote(data.vote_average),
      release_date: data.release_date,
      cast: Formatter.formatCast(data.credits.cast),
    };
  }

  static formatPoster(path: string): string {
    return `https://image.tmdb.org/t/p/w300${path}`;
  }

  static formatVote(value: number) {
    return parseFloat(value.toFixed(1));
  }

  static formatCast(cast: CastResult[]): Cast[] {
    return cast.slice(0, 10).map((elem: CastResult) => {
      return {
        id: elem.id,
        name: elem.name,
        image: this.formatImage(elem.profile_path),
        character: elem.character,
      };
    });
  }

  static formatImage(path: string | undefined): string | null {
    return path ? `https://image.tmdb.org/t/p/w300${path}` : null;
  }
}
