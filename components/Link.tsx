import {CSSProperties, FC} from 'react';
import Link from 'next/link';

type LinkProps = {
  text: string;
  href: string;
  style: CSSProperties;
}

const LinkComponent: FC<LinkProps> = ({text, href, style}) => {
  return <Link href="">Link</Link>
}

export default LinkComponent;
