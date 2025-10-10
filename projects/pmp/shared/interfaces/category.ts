export interface Category {
  id: number;
  isMainCategory: boolean;
  name: string;
  text: string;
  src: string;
  subCategories?: number[];
}
