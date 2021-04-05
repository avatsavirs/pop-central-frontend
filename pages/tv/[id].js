import {getTvById} from 'data/tv';
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
  const {popularTv} = await request(gql`
    query {
      popularTv {
        id
      }
    }
  `);
  return {
    paths: popularTv.map(tv => ({params: {id: tv.id}})),
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['tv', params.id], async () => await getTvById(params.id));
  return {
    props: {
      dehydrateState: dehydrate(queryClient),
      tvId: params.id
    }
  }
}

export default function Tv({tvId}) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div> Loading ... </div>
    )
  }
  const {data: tv} = useQuery(['tv', tvId], async () => await getTvById(tvId), {enabled: !router.isFallback});
  return (
    <div css={{
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      <Head> <title> {tv.title} | Pop Central </title> </Head>
      <Banner image={tv.backdropImage}>
        <Poster image={tv.poster} />
        <BannerContent title={tv.title} summary={tv.overview} releaseDate={tv.firstAirDate} rating={tv.rating} directors={tv.creadedBy} tagline={tv.tagline} genres={tv.genres} runtime={tv.runtime} />
      </Banner>
      <PageBody cast={tv.credits} />
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


