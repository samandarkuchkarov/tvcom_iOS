import { parse } from "fast-xml-parser";

export function parseXML(str) {
  const result = typeof str === "string" ? parse(str).rss : str;
  return result;
}
