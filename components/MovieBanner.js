import {Overlay} from 'styled-components';
export default function MovieBanner({image, children}) {
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
