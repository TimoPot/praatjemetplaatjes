export interface Category {
  id: number;
  isMainCategory: boolean;
  category: string;
  text: string;
  src: string;
  subCategories?: number[];
}
