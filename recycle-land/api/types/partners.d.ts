interface Partner {
  id: number;

  image?: string;

  website?: string;

  name: string;

  lat: number;

  long: number;

  contact_person: string;

  contact_phone: string;

  address: string;

  inn: string;

  is_active: boolean;

  materials: number[];

  PartnerMaterials: PartnerMaterial[];
}

interface PartnerRequest {
  id: number;
  inn: string;
  contact_person: string;
  contact_phone: string;
}

interface PartnerMaterial {
  id: number;
  partner_id: number;
  material_id: number;
  material: Material;
}
