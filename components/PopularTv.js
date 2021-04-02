import {getPopularTv} from 'data/tv';
import {useQuery} from 'react-query';
import DisplayCard from 'components/DisplayCard'

export default function PopularTv() {
  const {data: popularTv} = useQuery('popularTv', getPopularTv);
  return (
    <section aria-label="popular tv">
      <h2> Tv </h2>
      <div css={{
        padding: '3rem 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        gap: '3rem',
      }}>
        {
          popularTv?.map(tv => <DisplayCard key={tv.id} title={tv.title} id={tv.id} text={tv.overview} image={tv.poster} />)
        }
      </div>
    </section>
  );
}
