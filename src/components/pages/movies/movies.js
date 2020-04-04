import React, { Component, Fragment } from 'react';
import './movies.css';
import * as actions from '../../../actions';
import Api from '../../../api';
import { connect } from 'react-redux';
import Loading from '../../loading/loading';
import Pagination from '../pagination';

const { getFilms, searchMovie } = new Api();

class Movies extends Component {

    // state = {
    //     total_pages: null,
    // }

    onLoadFilms = movies => {
        this.props.loadFilms(movies)
        this.props.setLoading(false)
    }

    componentDidMount() {
        const { location: { search }, getCurrPage, setTotalPages } = this.props;
        const page = search.match(/\d+/g);
        getCurrPage(page)
        getFilms(page).then(data => {
            setTotalPages(data.total_pages)
            return data.results
        }).then(this.onLoadFilms)
    }

    componentDidUpdate(prevProps, prevState) {
        const { page, keyword, history, getCurrPage } = this.props;
        if (prevProps.page !== page) {
            this.props.setLoading(true)
            keyword ? searchMovie(keyword, page).then(data => this.onLoadFilms(data.results))
                    : getFilms(page).then(data => this.onLoadFilms(data.results))
        }
        if (prevProps.keyword !== keyword) {
            getCurrPage(null)
            history.push('/movies/')
        }
    }

    componentWillUnmount() {
        const { setLoading, setKeyword } = this.props;
        setKeyword('')
        setLoading(true)
    }

    
    render() {
        const { history, movies, loading, total_pages } = this.props;
        console.log(this.props)

        return (
            <Fragment>
                <Loading loading={loading}/>
                <div className='pagination'>
                    <Pagination total_pages={total_pages}/>
                </div>
                <div className='movies-page'>
                    <div className='movies-content'>
                        {movies.map(film => (
                            <article key={film.id} className='movies-article'
                                     onClick={() => history.push(film.id.toString())}>
                                <figure className='movies-figure'>
                                    <p><img className='img' src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title}/></p>
                                    <figcaption className='movies-figcaption'>{film.title}</figcaption>
                                </figure>
                            </article>
                        ))}
                    </div>
                </div>
            </Fragment>
        )
    };
};

const mapStateToProps = ({ movies: { movies, page, total_pages }, util: { loading, keyword }}) => {
    return { movies, page, loading, keyword, total_pages }
};

export default connect(mapStateToProps, actions)(Movies);