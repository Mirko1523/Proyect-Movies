import React, { ChangeEvent, FormEvent, useState } from "react";
import "./movie.css";
import axios from "axios";

interface moviesrating{
Title: string;
imdbRating: number;
Rated: string;
Year: number;
Runtime: number;
Genre: string;
Plot: string;
Actors: string;
Poster: string;
Error: string;
}
//En vez de interface tambien se puede utilizar las clases o class para representar la estructura de datos:
//Voy a dar un ejemplo sacado de chat gpt:
// class Movie {
//     title: string;
//     imdbRating: number;
//     rated: string;
//     year: number;
//     runtime: number;
//     genre: string;
//     plot: string;
//     actors: string;

//     constructor(title: string, imdbRating: number, rated: string, year: number, runtime: number, genre: string, plot: string, actors: string) {
//         this.title = title;
//         this.imdbRating = imdbRating;
//         this.rated = rated;
//         this.year = year;
//         this.runtime = runtime;
//         this.genre = genre;
//         this.plot = plot;
//         this.actors = actors;
//     }
// }

//  const key = '42b3b16d';


const Home: React.FC = () =>{
    const [moviedata, setMovieData] = useState<moviesrating | null>(null);
    const [movie, setMovie] = useState<string>('')
   const [error, setError] = useState< string|null >('');
    const changeMovie = (event: ChangeEvent<HTMLInputElement>) =>{
    setMovie(event.target.value)
}
    const callApi = async (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    try {
    //trim se utiliza para eliminar espacios en blanco
    //Sirve para que los usuarios no puedan poner un espacio al principio del texto y luego buscar.
  if (movie.trim() !== '') {
      const response = await axios.get<moviesrating>(
        `https://www.omdbapi.com/?t=${movie}&apikey=42b3b16d`
      );
      console.log("Respuesta de la api", response.data);
      if (response.data.Error) {
        setError(response.data.Error);
        setMovieData(null);
      } else {
        setMovieData(response.data);
        setError(null);
      }
    }
  } catch (error) {
    setError('Search again');
    setMovieData(null);
  }
};

  return (
    <div className="pageContainer">
      <div className="card">
        <div className="searchContainer">
          <form onSubmit={callApi}>
            <input
              type="text"
              value={movie}
              onChange={changeMovie}
              placeholder="search your favorite movie..."
              className="searchBar"
            />
            <button type="submit" className="searchButton">Search</button>
          </form>
        </div>
        {error && (
          <div>
            <img src='https://cdni.iconscout.com/illustration/premium/thumb/location-finding-error-2748723-2289757.png?f=webp' alt='not found' className='error-image'/>
            <p>{error}</p>
            <p>Please search again</p>
          </div>
        )}
{moviedata && (
  <div>
    <div className="title white">{moviedata.Title}</div>
    <div className="rating"><img src="https://cdn-icons-png.freepik.com/256/1828/1828884.png?semt=ais_hybrid" alt="icon" className="icon"/> {moviedata.imdbRating}</div>
    <div className="genre">
      {/* ACÁ EL SPLIT LO QUE HACE ES QUE SACAR LAS , DEL GENERO DE  LAS PELICULAS */}
      {moviedata.Genre && moviedata.Genre.split(', ').map((genre, index) => (
        <span key={index} className="genreItem">{genre}</span>
      ))}
    </div>
    <div className="movieDetails">
      <img src={moviedata.Poster} alt="posterdata" className="poster" />
      <div className="plot white"><p>Plot:</p> {moviedata.Plot}</div>
      <div className="cast white"><p>Actors:</p> {moviedata.Actors}</div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Home;

