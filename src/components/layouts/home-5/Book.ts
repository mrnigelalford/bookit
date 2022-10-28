export type Book = {
  img?: string;
  title?: string | null;
  tags?: string[];
  imgAuthor?: string;
  nameAuthor: string;
  price: string | number;
  // wishlist?: string[];
  // imgCollection: string;
  // nameCollection: string;
  id?: string;
  AuthorId: string; // TODO: REVISIT HOW THIS IS DEFINED FOR A GIVEN USER
  description: string | null;
  bonusContent?: {
    backCover: string;
    exerpts;
  };
  isPreviewCard?: boolean;
};
