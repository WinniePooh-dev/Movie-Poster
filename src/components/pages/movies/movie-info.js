import React, { useEffect, useState, Fragment } from 'react';
import './movie-info.css';
import Api from '../../../api';

const { getFilm } = new Api();
const img_url = 'https://image.tmdb.org/t/p/w500';

const MovieInfo = ({ match }) => {

    const {id} = match.params;
    const [film, setFilm] = useState({})

    useEffect(() => {
        getFilm(id).then(film => {
            setFilm(film)
            console.log(film)
        })
    }, [id])

    return (
        <div>
            <div className='movie-info'>
                {Object.keys(film).length ? 
                <Fragment>
                    <div className='images-container'>
                        <img className='poster' src={`${img_url}${film.poster_path}`} alt='None'/>
                        <div>
                            {film.images.backdrops.map((img, indx) => <img key={indx} className='image' src={`${img_url}${img.file_path}`} alt='None'/>).slice(0, 9)}
                        </div>
                    </div>
                    <section className='title'>
                        <h1>{film.title}</h1>
                        <p>{film.genres.map((e, i) => <span key={i} className='genre'>{e.name}</span>)}</p>
                    </section>
                    <section className='overview'>
                        <h3>{film.tagline ? film.tagline.concat('...') : null}</h3>
                        <p>{film.overview}</p>
                    </section>
                </Fragment>
            : null}
            </div>
        </div>
    )
}

export default MovieInfo;