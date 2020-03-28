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

    const setTimeFromMinutes = (min) => {
        let hours = Math.trunc(min/60);
        let minutes = min % 60;
        return hours + 'h ' + minutes + 'min';
    };

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
                    <div className='about'>
                        <iframe title='trailer' width='780' height='600'
                            src={`https://www.youtube.com/embed/${film.videos.results[0].key}?autoplay=1`}>
                        </iframe>
                        <ul>
                            <li>Budget: {film.budget} &#36;</li>
                            <li>Revenue: {film.revenue} &#36;</li>
                            <li><p>Homepage: <a href={film.homepage}>{film.homepage}</a></p></li>
                            <li>Release Date: {new Date(film.release_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}</li>
                            <li>Duration: {setTimeFromMinutes(film.runtime)}</li>
                            <li>{film.production_countries.map((e,i) => <div key={i} className='item'>{`${e.name}\n(${e.iso_3166_1})`}</div>)}</li>
                        </ul>
                    </div>
                </Fragment>
            : null}
            </div>
        </div>
    )
}

export default MovieInfo;