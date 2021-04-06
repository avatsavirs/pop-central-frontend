import {Card} from 'styled-components';
import {StyledLink, CardImage} from 'styled-components';
import Image from 'next/image';
import {CardBody} from 'styled-components';
import {CardText} from 'styled-components';
import {CardTitle} from 'styled-components';
import {CardLinks} from 'styled-components';
import Link from 'next/link';

export default function DisplayCard({title, image, text, link, id}) {
  return (
    <Card css={{
      a: {
        color: 'var(--primary-text)',
        textDecoration: 'none',
      }
    }}>
      <CardImage><Link href={link} passHref><a tabIndex={-1}><Image src={image} layout="fill" objectFit="cover" /></a></Link> </CardImage>
      <CardBody>
        <Link href={link} passHref><a><CardTitle><h4>{title}</h4></CardTitle></a></Link>
        <Link href={link} passHref><a tabIndex={-1} css={{outline: 'none'}}><CardText><p>{text}</p></CardText></a></Link>
        <CardLinks>
          <StyledLink as="button"> Add to List </StyledLink>
        </CardLinks>
      </CardBody>
    </Card>
  )
}
