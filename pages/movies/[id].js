import {getMovieById} from 'data/movies';
import Head from 'next/head';
import Image from 'next/image';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {useRouter} from 'next/router'
import Banner from 'components/DetailsPage/Banner'
import BannerContent from 'components/DetailsPage/BannerContent'
import PageBody from 'components/DetailsPage/PageBody';
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
  const {data: movie} = useQuery(['movies', movieId], async () => await getMovieById(movieId), {enabled: !router.isFallback});
  return (
    <div css={{
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      <Head> <title> {movie.title} | Pop Central </title> </Head>
      <Banner image={movie.backdropImage}>
        <Poster image={movie.poster} />
        <BannerContent title={movie.title} summary={movie.overview} releaseDate={movie.releaseDate} rating={movie.rating} directors={movie.directors} tagline={movie.tagline} genres={movie.genres} runtime={movie.runtime} />
      </Banner>
      <PageBody cast={movie.credits} />
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


