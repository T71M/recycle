interface Partner {
  id: number;

  image?: string | File;

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

  PartnerMaterials?: Material[];
}

interface PartnerFindParams extends BasePaginationParams {
  query?: string;
  is_active: boolean;
}
