export interface Asset {
  serial_number: string;
  refiner_name: string;
  weight_grams: number;
  fineness: number;
  gold_product_type_id: "bar" | "coin" | "ingot";
  traceability_gic: string;
  initial_owner_igan: string;

  certificate_base64?: string;
  certificate_path?: string;

  auto_verify_hash?: boolean;

  manufacture_date: string;
  certification_framework: string;
  certified: boolean;
}
