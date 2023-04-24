export interface IData {
  id: number;
  name: string;
  photo: string;
  buyPrice: number;
  sellPrice: number;
  stockLeft: number;
  userId: number;
  deletedAt: any;
  createdAt: string;
}

export default interface Product {
  data: IData[];
}
