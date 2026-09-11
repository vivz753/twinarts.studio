import { createClient as makeClient } from "next-sanity"
export const client = makeClient({
  projectId: "flmc67dk",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // important for ISR in Next.js, to revalidate cached data in case updates to Sanity are published
})
