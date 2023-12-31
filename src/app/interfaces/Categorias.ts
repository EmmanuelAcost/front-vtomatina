export interface Categorias {
  id: number;
  detail: string;
  image: string;
  porcentaje: number;
  posicion: number;
  tipo: string;
  vistaventa: number;
}

export const CategoriasInter = {
  id: 0,
  detail: '',
  image: '',
  porcentaje: 0,
  posicion: 0,
  tipo: '',
  vistaventa: 0,
};

export const NameCategoryInter = {
  id: 1,
  detail: 'LIMONADAS',
  image: 'https://tualiadotae.com/frappe/img/app/articulos/frappe1.jpg',
  tipo: 'I',
  porcentaje: '0',
  vistaventa: 0,
  posicion: 0,
};
