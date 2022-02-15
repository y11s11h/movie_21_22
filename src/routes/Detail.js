import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Movie from '../components/Movie';
import styles from "./Detail.module.css";

function Detail() {
  const {id} = useParams();
  const [movieInfo, setMovieInfo] = useState([]);
  const getMovie = async () => {
    const json = await(
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovieInfo(json.data.movie);
    
  }
  useEffect(() => {
    getMovie();
  }, []);


  return (
    <div>
      <div className={styles.back}>
        <img src={movieInfo.background_image_original}></img>
        <div className={styles.gradient}></div>
      </div>
      <img src={movieInfo.medium_cover_image} className={styles.cover}></img>
      <div className={styles.btn}>
        <button className={styles.play}><i className="fas fa-play"></i>재생</button>
        <button className={styles.like}><i className="far fa-heart"></i></button>

      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{movieInfo.title}</h1>
        <div className={styles.info}>
          <div className={styles.rating}>
            <i className="fas fa-star"></i>
            <span>{movieInfo.rating}</span>
          </div>
          <span className={styles.year}>{movieInfo.year}</span>
          <span className={styles.runtime}>{movieInfo.runtime}분</span>
        </div>
        <ul className={styles.genres}>
          {(movieInfo.genres) && (movieInfo.genres).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p>{movieInfo.description_full}</p>
      </div>
      
      
    </div>
  )

}

export default Detail;
