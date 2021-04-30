import {getMovieById} from 'data/movies';
import Head from 'next/head';
import Image from 'next/image';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import Banner from 'components/DetailsPage/Banner'
import BannerContent from 'components/DetailsPage/BannerContent'
import PageBody from 'components/DetailsPage/PageBody';
import {useRouter} from 'next/router';
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
  const {data: movie, error, isIdle, isLoading, isSuccess, isError, status} = useQuery(['movies', movieId], async () => await getMovieById(movieId), {enabled: !router.isFallback});
  if (router.isFallback) return null;
  if (isIdle || isLoading) {
    return (
      <div>Loading...</div>
    )
  } else if (isError) {
    return (
      <div>Error: {error.message}</div>
    )
  } else if (isSuccess) {
    return (
      <div css={{
        maxWidth: '100vw',
        overflowX: 'hidden'
      }}>
        <Head> <title> {movie.title} | Pop Central </title> </Head>
        <Banner image={movie.backdropImage}>
          <Poster image={movie.poster} />
          <BannerContent title={movie.title} summary={movie.overview} releaseDate={movie.releaseDate} rating={movie.rating} directors={movie.directors} tagline={movie.tagline} genres={movie.genres} runtime={movie.runtime} mediaType="movies" externalId={movie.id} image={movie.poster} />
        </Banner>
        <PageBody cast={movie.credits} related={movie.related} />
      </div>
    )
  }
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


