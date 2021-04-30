import Image from 'next/image';
import Link from 'next/link';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ListSlider({data}) {
  const responsive = {
    desktop: {
      breakpoint: {max: 3000, min: 1300},
      items: 5,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: {max: 1300, min: 375},
      items: 3,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: {max: 375, min: 0},
      items: 1,
      paritialVisibilityGutter: 30
    }
  };
  return (
    <Carousel
      ssr
      deviceType={"desktop"}
      responsive={responsive}
      itemClass="slider-item"
      css={{
        width: '100%',
        '@media(max-width: 375px)': {
          width: '80%',
          margin: '0 auto'
        }
      }}
    >
      {data.map(item => {
        return (
          <Link href={`/${item.mediaType}/${item.externalId}`} key={item.id} passHref>
            <a>
              <div css={{
                backgroundColor: 'white',
                color: 'black',
                height: '35rem',
                position: 'relative',
                ':hover': {
                  div: {
                    transform: 'translateY(0)'
                  },
                  img: {
                    transform: 'scale(1.05)'
                  }
                }
              }} >
                <Image css={{transition: 'transform 0.3s ease-in-out'}} src={item.image} layout="fill" objectFit="cover" />
                <div css={{
                  zIndex: 100,
                  position: 'absolute',
                  background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 1));',
                  bottom: '0',
                  width: '100%',
                  padding: '5px 0',
                  transform: 'translateY(100%)',
                  transition: 'transform 0.3s ease-in-out',
                  transformOrigin: '0 100%',
                  fontSize: 'var(--h3)',
                }}>
                  <h3 css={{color: 'white', }}>{item.title}</h3>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </Carousel>
  );
}
