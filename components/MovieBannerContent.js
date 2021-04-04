export default function MovieBannerContent({title, summary, releaseDate, directors, rating, tagline, genres, runtime}) {
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
          }} key={genre}>{genre}</li>
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
          <div key={director.name}>
            <h5> {director.name} </h5>
            <p> Director </p>
          </div>
        ))}
      </div>
    </div>
  )
}
