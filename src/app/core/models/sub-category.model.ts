export class SubCategoryModel {
  msg: string;
  lista: SubcategoriaItem[];
  error: string;
}

export interface SubcategoriaItem {
  id: number;
  descripcion: string;
  mayor: string;
  fech_reg: Date;
  estado: string;
}
