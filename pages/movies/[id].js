import {getMovieById, getPopularMovies} from 'data/movies';
import Head from 'next/head';
import Image from 'next/image';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {Overlay} from 'styled-components';
import {useRouter} from 'next/router'

const {gql} = require('graphql-request');
const {request} = require('utils');

export async function getStaticPaths() {
  const {popularMovies} = await request(gql`
    query {
      popularMovies {
        id
      }
    }
  `);
  return {
    paths: popularMovies.map(movie => ({params: {id: movie.id}})),
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['movies', params.id], async () => await getMovieById(params.id));
  return {
    props: {
      dehydrateState: dehydrate(queryClient),
      movieId: params.id
    }
  }
}

export default function Movie({movieId}) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div> Loading ... </div>
    )
  }
  console.log({movieId})
  const {data: movie} = useQuery(['movies', movieId], async () => await getMovieById(movieId), {enabled: !router.isFallback});
  return (
    <div>
      <Head> <title> {movie.title} | Pop Central </title> </Head>
      <Banner image={movie.backdropImage}>
        <Poster image={movie.poster} />
        <MovieOverview title={movie.title} summary={movie.overview} releaseDate={movie.releaseDate} rating={movie.rating} directors={movie.directors} tagline={movie.tagline} genres={movie.genres} runtime={movie.runtime} />
      </Banner>
      <div css={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div css={{
          width: 'var(--content-width)'
        }}>
        </div>
      </div>
    </div>
  )
}

function Banner({image, children}) {
  return (
    <div css={{
      width: '100vw',
      height: '60rem',
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Overlay />
      <div css={{flexBasis: 'var(--content-width)', position: 'relative', display: 'flex'}}>
        {children}
      </div>
    </div>
  )
}

function Poster({image}) {
  return (
    <div css={{flexBasis: '25%', display: 'flex', alignItems: 'center'}}>
      <div css={{border: '2px solid var(--border-color)', borderRadius: '15px', position: 'relative', width: '100%', height: '80%', overflow: 'hidden'}}>
        <Image src={image} layout="fill" objectFit="cover" />
      </div>
    </div>
  )
}

function MovieOverview({title, summary, releaseDate, directors, rating, tagline, genres, runtime}) {
  const releaseYear = releaseDate.match(/^(\d{4})-/)[1];
  runtime = (Math.floor(runtime / 60)) + 'h ' + (runtime % 60) + 'min';
  return (
    <div css={{
      flexBasis: '75%',
      padding: '10rem 4rem',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <div css={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <h2> {title} </h2>
        <p css={{fontSize: 'var(--h2)'}}>({releaseYear})</p>
      </div>
      <ul css={{
        display: 'flex',
        gap: '1rem',
        listStyle: 'none',
        fontSize: 'var(--h5)',
        color: 'var(--muted-text)'
      }}>
        {genres.map(genre => (
          <li css={{
            display: 'inline'
          }}>{genre}</li>
        ))}
        <li > {runtime} </li>
      </ul>
      <div css={{
        display: 'flex',
        gap: '3rem'
      }}>
        <h4> 🌟   {rating} </h4>
        <button> Like </button>
        <button> Add to List </button>
      </div>
      <p css={{color: 'var(--muted-text)', fontStyle: 'italic'}}> {tagline} </p>
      <p> {summary} </p>
      <div css={{display: 'flex', gap: '5rem'}}>
        {directors.map(director => (
          <div>
            <h5> {director.name} </h5>
            <p> Director </p>
          </div>
        ))}
      </div>
    </div>
  )
}
