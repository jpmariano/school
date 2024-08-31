import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GetPageDetails } from "@/utils/getPageDetails";
import { getPage, isFetchResponse } from "@/api/drupal";
import { notFound } from "next/navigation";
import TokenExpiredMessage from '@/components/tokenExpiredMessage'
import { ErrorResponse, PathDetails } from "@/types";

export async function middleware(request: NextRequest) {

  // Log the current request pathname
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  const pathname = headers.get("x-current-path");
  //const pageDetailsResponse: Response | ErrorResponse = await getPage(pathname ? pathname : '/');
   //const pageDetails = await GetPageDetails(request.nextUrl.pathname);
  //const status = String(pageDetailsResponse.status);
  //if (isFetchResponse(pageDetailsResponse)) {
    //const pageDetails: PathDetails = await pageDetailsResponse.json();
    //console.log('pageDetails.entity.type', pageDetails.entity.type);
    //headers.set("x-page-details", JSON.stringify(pageDetails));
  //} 
  //headers.set("status", status);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};