import * as React from 'react';
import { useState } from 'react';



const useWindowDimensions = () => {

    const [windowDimensions, setWindowDimensions] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
      const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      };
      setWindowDimensions(getWindowDimensions());
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}

export default useWindowDimensions;