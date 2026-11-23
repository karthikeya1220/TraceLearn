import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import { readToken } from "./token";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
});
