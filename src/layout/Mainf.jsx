import React, {useState, useEffect} from "react"
import { Movies} from "../components/Movies"
import { Preloader } from "../components/Preloader"
import { Searchf } from "../components/Searchf"

const Mainf = () =>{

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const searchMovies = (str, type='all') =>{
        setLoading(false);
        fetch(`http://www.omdbapi.com/?apikey=392550c2&s=${str}${type !== 'all' ? `&type=${type}`: ''}`)
        .then(response => response.json())
        .then((data) =>{
            setMovies(data.Search);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }

    useEffect(() => {
        fetch('http://www.omdbapi.com/?apikey=392550c2&s=matrix')
        .then(response => response.json())
        .then((data) =>{
            setMovies(data.Search);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    return( <main className="container content">
        <Searchf searchMovies={searchMovies}/>
        {loading ? <Preloader/>  : <Movies movies={movies}/> }
    </main>);
}

export {Mainf}