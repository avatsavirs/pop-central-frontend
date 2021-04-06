import {Card} from 'styled-components';
import {StyledLink, CardImage} from 'styled-components';
import Image from 'next/image';
import {CardBody} from 'styled-components';
import {CardLinks} from 'styled-components';
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function DisplayCard({title, image, text, link, id}) {
  const router = useRouter();
  function navigateToDetailsPage(event) {
    if (event.target !== event.currentTarget) return;
    router.push(link);
  }
  return (
    <Card css={{
      a: {
        color: 'var(--primary-text)',
        textDecoration: 'none',
      }
    }}
    >
      <CardImage><Link href={link} passHref><a tabIndex={-1}><Image src={image} layout="fill" objectFit="cover" /></a></Link> </CardImage>
      <CardBody
        css={{cursor: 'pointer'}}
        onClick={navigateToDetailsPage}>
        <Link href={link} passHref><a css={{paddingBottom: '1rem'}}><h4>{title.length < 42 ? title : title.slice(0, 40) + '...'}</h4></a></Link>
        <Link href={link} passHref><a tabIndex={-1} css={{outline: 'none', flexGrow: '1'}}><p>{text.length < 290 ? text : text.slice(0, 287) + "..."}</p></a></Link>
        <CardLinks>
          <StyledLink as="button"> Add to List </StyledLink>
        </CardLinks>
      </CardBody>
    </Card>
  )
}
