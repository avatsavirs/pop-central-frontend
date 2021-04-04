import {useQuery} from 'react-query'
import DisplayCard from 'components/DisplayCard';
import {getPopularMovies} from 'data/movies';

export default function PopularMovies() {
  const {data: popularMovies} = useQuery('movies', getPopularMovies);
  return (

    <section aria-label="popular movies">
      <h2> Movies </h2>
      <div css={{
        padding: '3rem 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        gap: '3rem',
      }}>
        {
          popularMovies?.map(movie => <DisplayCard key={movie.id} title={movie.title} id={movie.id} text={movie.overview} image={movie.poster} link={`/movies/${movie.id}`} />)
        }
      </div>
    </section>
  )
}
