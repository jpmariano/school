//const NODE_ENV = process.env.NODE_ENV;
//const NEXT_PUBLIC_LOCAL = process.env.NEXT_PUBLIC_LOCAL;
//const NEXT_PUBLIC_DEV = process.env.NEXT_PUBLIC_DEV;
//const NEXT_PUBLIC_STAGING = process.env.NEXT_PUBLIC_STAGING;
//const NEXT_PUBLIC_PROD = process.env.NEXT_PUBLIC_PROD;


//export const BASE_URL = NEXT_PUBLIC_LOCAL ? NEXT_PUBLIC_LOCAL : NODE_ENV === 'development' ? NEXT_PUBLIC_DEV : NODE_ENV === 'test' ? NEXT_PUBLIC_STAGING : NEXT_PUBLIC_PROD;

//console.log('Environment')
//console.log(BASE_URL);

// @todo: replace the latter with the production website domain url
//export const DOMAIN = DEV ? DOMAIN_STAGING : DOMAIN_STAGING ? DOMAIN_STAGING : DOMAIN_PROD;

console.log('Environment')
console.log(process.env.NODE_ENV)
let DOMAIN_URL: string = "";
switch(process.env.NODE_ENV) { 
    case "development": { 
        DOMAIN_URL = process.env.NEXT_PUBLIC_DEV ? process.env.NEXT_PUBLIC_DEV : process.env.NEXT_PUBLIC_LOCAL ? process.env.NEXT_PUBLIC_LOCAL : "http://localhost:8084";
       break; 
    } 
    case "test": { 
        DOMAIN_URL = process.env.NEXT_PUBLIC_STAGING ? process.env.NEXT_PUBLIC_STAGING : process.env.NEXT_PUBLIC_LOCAL ? process.env.NEXT_PUBLIC_LOCAL : "http://localhost:8084";
       break; 
    } 
    case "production": { 
        DOMAIN_URL = process.env.NEXT_PUBLIC_PROD ? process.env.NEXT_PUBLIC_PROD : process.env.NEXT_PUBLIC_LOCAL ? process.env.NEXT_PUBLIC_LOCAL : "http://localhost:8084";
        break; 
     } 
    default: { 
        DOMAIN_URL = process.env.NEXT_PUBLIC_LOCAL ? process.env.NEXT_PUBLIC_LOCAL : "http://localhost:8084";
       break; 
    } 
 }

export const BASE_URL = DOMAIN_URL;
