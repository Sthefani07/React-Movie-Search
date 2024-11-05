import { useState, useEffect } from "react";
import "./App.css";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  const apiKey = "98e3fb1f"; // Replace with your own if needed
  const [movie, setMovie] = useState(null);

  const getMovie = async (searchTerm) => {
    let response;
    try {
      if (searchTerm == '') {
        let min = 1000000;
        let max = 5000000;
        let randNum = Math.round(Math.random() * (max - min)) + min;
        console.log(randNum);
        let url = `http://www.omdbapi.com/?apikey=${apiKey}&i=tt${randNum}`;
        response = await fetch(url);
      } else {
        response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
        );
      }
      const data = await response.json();
      setMovie(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
  getMovie("");
}, []);

  return (
  <div className="App">
    <Form moviesearch={getMovie} />
    <MovieDisplay movie={movie} />
  </div>
);

}
