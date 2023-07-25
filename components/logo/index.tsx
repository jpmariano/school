
import React from 'react';
import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <Image
        src="/logo.png"
        width={230}
        height={60}
        alt="webupps logo"
    />
        
    );
};

export default Logo;
