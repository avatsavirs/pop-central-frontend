import {Overlay} from 'styled-components';
import Image from 'next/image';

export default function Banner({image, children}) {
  return (
    <div css={{
      width: '100vw',
      height: '60rem',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Overlay />
      {image && <Image src={image} layout="fill" objectFit="cover" quality={1} />}
      <div css={{flexBasis: 'var(--content-width)', position: 'relative', display: 'flex', zIndex: 2}}>
        {children}
      </div>
    </div>
  )
}
