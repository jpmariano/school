
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import styles from "@/styles/components/logo/logo.module.scss";

const Logo: React.FC = () => {
  return (
    <Link href="/" passHref className={styles.logolink}>
      <Image
        src="/logo.png"
        width={150}
        height={38}
        alt="webupps logo"
    />
    </Link>
    );
};

export default Logo;
