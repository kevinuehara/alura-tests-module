export type GoogleBooksResponse = {
  kind: string;
  totalItems: number;
  items: GoogleBookItem[];
};

export type GoogleBookItem = {
  id: string;
  volumeInfo: VolumeInfo;
};

export type VolumeInfo = {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  imageLinks?: {
    thumbnail: string;
  };
};
