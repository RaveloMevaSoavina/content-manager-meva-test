import { Article } from "./Article";
import { Category } from "./Category";
import { Tag } from "./Tag";


export type DataType = Article | Category | Tag | Article[] | Category[] | Tag[];

export interface ApiResponse<T extends DataType> {
  status: string;
  message: string;
  data: T;
}