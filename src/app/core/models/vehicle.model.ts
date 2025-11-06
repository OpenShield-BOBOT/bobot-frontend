export interface Vehicle {
  id?: number;
  title: string;
  precio_base?: number;
  tipo_moneda?: string;
  ubicacion?: string;
  marca?: string;
  modelo?: string;
  placa?: string;
  kilometraje?: number;
  anio?: number;
  procedencia?: string;
  con_garantia?: boolean;
  categoria?: string;
  tipo_subasta?: string;
  empresa_proveedora?: string;
}
