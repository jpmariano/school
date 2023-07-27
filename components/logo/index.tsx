
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" passHref>
      <Image
        src="/logo.png"
        width={230}
        height={60}
        alt="webupps logo"
    />
    </Link>
    );
};

export default Logo;
