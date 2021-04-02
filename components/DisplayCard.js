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
    <Card>
      <CardImage> <Image src={image} layout="fill" objectFit="cover" /> </CardImage>
      <CardBody>
        <CardTitle><h4>{title}</h4></CardTitle>
        <CardText><p>{text}</p></CardText>
        <CardLinks>
          <StyledLink as="button"> Add to List </StyledLink>
          <Link href="#" passHref><StyledLink> Read More </StyledLink></Link>
        </CardLinks>
      </CardBody>
    </Card>
  )
}
