// import type { Blog } from "../../.velite/index";
// import { blog } from "../../.velite/index";

// type Filter<T> = (value: T, index: number, array: T[]) => boolean;
// type Sorter<T> = (a: T, b: T) => number;

// export const sorters = {
//   createdAtAsc: <I extends { createdAt: string }>(a: I, b: I): number =>
//     a.createdAt > b.createdAt ? 1 : -1,
//   createdAtDesc: <I extends { createdAt: string }>(a: I, b: I): number =>
//     a.createdAt > b.createdAt ? -1 : 1,
// };

// const pick = <T extends object, K extends keyof T>(
//   obj: T,
//   keys?: K[],
// ): { [P in K]: T[P] } => {
//   if (keys == null) return obj;
//   return Object.fromEntries(keys.map((k) => [k, obj[k]])) as { [P in K]: T[P] };
// };
// export const getPosts = async <F extends keyof Blog>(
//   fields?: F[],
//   sorter: Sorter<Blog> = sorters.createdAtDesc,
//   limit: number = Infinity,
//   offset: number = 0,
// ): Promise<{ [P in F]: Blog[P] }[]> => {
//   return blog
//     .sort(sorter)
//     .slice(offset, offset + limit)
//     .map((o) => pick(o, fields));
// };

// export const getPost = async <F extends keyof Blog>(
//   filter: Filter<Blog>,
//   fields?: F[],
// ): Promise<{ [P in F]: Blog[P] } | undefined> => {
//   const post = blog.find(filter);
//   return post && pick(post, fields);
// };

// export const getPostBySlug = async <F extends keyof Blog>(
//   slug: string,
//   fields?: F[],
// ): Promise<{ [P in F]: Blog[P] } | undefined> => {
//   return getPost((i) => i.slug === slug, fields);
// };
