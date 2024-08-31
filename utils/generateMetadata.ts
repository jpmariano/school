import { ErrorResponse, GetNodeResponse } from "@/types";
import { Metadata } from "next";
//not used
/*
export default async function generateMetadata(title: string, description: string): Promise<Metadata> {
    return {
      title: title,
      description: description,
    };
  }  
*/

  export default async function generateMetadata(data: GetNodeResponse | ErrorResponse): Promise<Metadata> {

    //const data: GetNodeResponse | ErrorResponse = await GetNodePage();
    
      if(!("status" in data)){
        const { pageDetails, node } = data;
        return {
          title: pageDetails.label,
          description: node ? node.data.attributes.body.value : 'Learn by coding',
        };
      } 
  
    return {
      title: 'Webupps',
      description: 'Lean by coding',
    };
    
   
  } 