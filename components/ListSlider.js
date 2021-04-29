import Image from 'next/image';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ListSlider({data}) {
  const responsive = {
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 5,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 2,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
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
      css={{width: '100%'}}
    >
      {data.map(item => {
        return (
          <div css={{
            backgroundColor: 'white',
            color: 'black',
            height: '33rem',
            position: 'relative',
            ':hover': {
              div: {
                transform: 'scaleY(1)'
              }
            }
          }} key={item.id}>
            <Image css={{position: 'relative', zIndex: 0}} src={item.image} layout="fill" />
            <div css={{
              zIndex: 100,
              position: 'absolute',
              background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 1));',
              bottom: '0',
              width: '100%',
              padding: '5px 0',
              transform: 'scaleY(0)',
              transition: 'transform 0.3s ease-in-out',
              transformOrigin: '0 100%',
              fontSize: 'var(--h3)'
            }}>
              <h3 css={{color: 'white', }}>{item.title}</h3>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
