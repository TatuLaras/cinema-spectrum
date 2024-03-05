export interface UserConfig {
    paths: {
        tv: string[];
        movies: string[];
    };
    tmdb_key: string;
    player_command: string;
}

export const defaultConfig: UserConfig = {
    paths: {
        tv: [],
        movies: [],
    },
    tmdb_key: '',
    player_command: '',
};

export namespace TMDBTypes {
    export interface Movie {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        overview: string;
        poster_path: string;
        popularity: number;
        vote_average: number;
        vote_count: number;
        original_title: string;
        release_date: string;
        title: string;
        video: boolean;
    }

    export interface MovieDetails {
        adult: boolean;
        backdrop_path: string;
        belongs_to_collection: null;
        budget: number;
        genres: Genre[];
        homepage: string;
        id: number;
        imdb_id: string;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        production_companies: ProductionCompany[];
        production_countries: ProductionCountry[];
        release_date: string;
        revenue: number;
        runtime: number;
        spoken_languages: SpokenLanguage[];
        status: string;
        tagline: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
        credits: Credits;
    }

    export interface Credits {
        cast: Cast[];
        crew: Cast[];
    }

    export interface Cast {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: null | string;
        cast_id?: number;
        character?: string;
        credit_id: string;
        order?: number;
        department?: string;
        job?: string;
    }

    export interface Genre {
        id: number;
        name: string;
    }

    export interface ProductionCompany {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }

    export interface ProductionCountry {
        iso_3166_1: string;
        name: string;
    }

    export interface SpokenLanguage {
        english_name: string;
        iso_639_1: string;
        name: string;
    }

    export interface Tv {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        origin_country: string[];
        original_language: string;
        original_name: string;
        overview: string;
        popularity: number;
        poster_path: string;
        first_air_date: string;
        name: string;
        vote_average: number;
        vote_count: number;
    }

    export interface TvDetails {
        adult: boolean;
        backdrop_path: string;
        created_by: CreatedBy[];
        episode_run_time: any[];
        first_air_date: string;
        genres: Genre[];
        homepage: string;
        id: number;
        in_production: boolean;
        languages: string[];
        last_air_date: string;
        last_episode_to_air: LastEpisodeToAir;
        name: string;
        next_episode_to_air: null;
        networks: Network[];
        number_of_episodes: number;
        number_of_seasons: number;
        origin_country: string[];
        original_language: string;
        original_name: string;
        overview: string;
        popularity: number;
        poster_path: string;
        production_companies: Network[];
        production_countries: ProductionCountry[];
        seasons: Season[];
        spoken_languages: SpokenLanguage[];
        status: string;
        tagline: string;
        type: string;
        vote_average: number;
        vote_count: number;
        aggregate_credits: AggregateCredits;
    }

    export interface AggregateCredits {
        cast: TvCast[];
        crew: TvCast[];
    }

    export interface TvCast {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: Department;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: null | string;
        roles?: Role[];
        total_episode_count: number;
        order?: number;
        jobs?: TvJob[];
        department?: Department;
    }

    export enum Department {
        Acting = 'Acting',
        Art = 'Art',
        Camera = 'Camera',
        CostumeMakeUp = 'Costume & Make-Up',
        Crew = 'Crew',
        Directing = 'Directing',
        Editing = 'Editing',
        Production = 'Production',
        Sound = 'Sound',
        Writing = 'Writing',
    }

    export interface TvJob {
        credit_id: string;
        job: string;
        episode_count: number;
    }

    export interface Role {
        credit_id: string;
        character: string;
        episode_count: number;
    }

    export interface CreatedBy {
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string;
    }

    export interface Genre {
        id: number;
        name: string;
    }

    export interface LastEpisodeToAir {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        episode_type: string;
        production_code: string;
        runtime: number;
        season_number: number;
        show_id: number;
        still_path: string;
    }

    export interface Network {
        id: number;
        logo_path: null | string;
        name: string;
        origin_country: string;
    }

    export interface ProductionCountry {
        iso_3166_1: string;
        name: string;
    }

    export interface SpokenLanguage {
        english_name: string;
        iso_639_1: string;
        name: string;
    }

    export interface SeasonDetails {
        _id: string;
        air_date: string;
        episodes: Episode[];
        name: string;
        overview: string;
        id: number;
        poster_path: string;
        season_number: number;
        vote_average: number;
    }

    export interface Episode {
        air_date: string | null;
        episode_number: number;
        episode_type: EpisodeType;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        runtime: number | null;
        season_number: number;
        show_id: number;
        still_path: null | string;
        vote_average: number;
        vote_count: number;
        crew: Crew[];
        guest_stars: Crew[];
    }

    export interface Crew {
        department?: Department;
        job?: Job;
        credit_id: string;
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: KnownForDepartment;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: null | string;
        character?: string;
        order?: number;
    }

    export enum Job {
        Director = 'Director',
        Writer = 'Writer',
    }

    export enum KnownForDepartment {
        Acting = 'Acting',
        Writing = 'Writing',
    }

    export enum EpisodeType {
        Standard = 'standard',
    }

    export interface CreatedBy {
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string;
    }

    export interface Genre {
        id: number;
        name: string;
    }

    export interface Network {
        id: number;
        logo_path: null | string;
        name: string;
        origin_country: string;
    }

    export interface ProductionCountry {
        iso_3166_1: string;
        name: string;
    }

    export interface Season {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
        vote_average: number;
    }

    export interface SpokenLanguage {
        english_name: string;
        iso_639_1: string;
        name: string;
    }
}

export interface MovieMetadata extends TMDBTypes.MovieDetails {
    file_path: string;
}

export interface Episode extends TMDBTypes.Episode {
    file_path: string | null;
}

export interface SeasonDetails
    extends Omit<TMDBTypes.SeasonDetails, 'episodes'> {
    episodes: Episode[];
}

export interface TvMetadata extends Omit<TMDBTypes.TvDetails, 'seasons'> {
    seasons: SeasonDetails[];
}

export interface MetadataCollection {
    movies: MovieMetadata[];
    tv: TvMetadata[];
}

export interface SeasonEpisode {
    season: number;
    episode: number;
}

export interface Bookmarks {
    [media_id: string]: {};
}
