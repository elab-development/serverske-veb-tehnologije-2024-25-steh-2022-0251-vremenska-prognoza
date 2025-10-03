export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: string;
};

export type News = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  slug: string;
  image: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};
