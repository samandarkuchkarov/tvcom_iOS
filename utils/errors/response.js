import { parse } from "fast-xml-parser";

export default function responseError(error) {
  let errorResult = error?.response?.data?.error_message;
  if(!error.response)
    errorResult = error;
  else if(!error.response?.data)
    errorResult = error.response;
  else if(error.response?.data?.message)
    errorResult = error.response?.data?.message;
  else if (!errorResult)
    errorResult =
      error.response.data.slice(1, 4) === "rss"
        ? parse(error.response.data).rss.error_message
        : error.response.data;

  return { message: errorResult };
}
