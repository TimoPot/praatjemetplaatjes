export interface Card {
  id: number;
  name: string;
  speech: string;
  src: string;
  parentId: number | null;
  childrenIds: number[] | null;
}
