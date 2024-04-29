//Apikey: 42b3b16d
//!PARTES DE LA API
//Title
//imbdRating
//Rated
//Year
//Runtime
//Genre
//Plot
//Actors
//!

import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

interface moviesrating{
title: string;
imdbRating: number;
Rated: string;
Year: number;
Runtime: number;
Genre: string;
Plot: string;
Actors: string;
Poster: string;
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

    const changeMovie = (event: ChangeEvent<HTMLInputElement>) =>{
    setMovie(event.target.value)
}
    const callApi = async (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    try {
    //trim se utiliza para eliminar espacios en blanco
    //Sirve para que los usuarios no puedan poner un espacio al principio del texto y luego buscar.
   if(movie.trim() !== ''){
   const response = await axios.get<moviesrating>(
    `https://www.omdbapi.com/?t=${movie}&apikey=42b3b16d`
   );
   console.log("Respuesta de la api", response.data)
   setMovieData(response.data);
}
    } catch (error) {
        console.error("Error al llamar a la API:", error);
    }

}
return(
    <div>
        <form onSubmit={callApi}>
            <input
            type="text" 
            value={movie} 
            onChange={changeMovie} 
            placeholder="search your favorite movie..." 
            
             />

        <button type="submit">Search</button>
        </form>

        {moviedata && (
            <div>
            <h2>{moviedata.title}</h2>
            <img src={moviedata.Poster} alt="posterdata" className="poster"/>
            <p>Rating:{moviedata.imdbRating}</p>
            <p>Rated:{moviedata.Rated}</p>
            <p>Year:{moviedata.Year}</p>
            <p>Runtime:{moviedata.Runtime}</p>
            <p>Genre:{moviedata.Genre}</p>
            <p>Plot:{moviedata.Plot}</p>
            <p>Actors:{moviedata.Actors}</p>
            </div>
        )}
    </div>
    
) 
};



export default Home;