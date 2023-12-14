interface PartnerRequest {
  id: number;
  inn: string;
  contact_person: string;
  contact_phone: string;
  is_active: boolean;
  is_accept: boolean;
}

interface PartnerRequestFindParams extends BasePaginationParams {
  query?: string;
  is_active: boolean;
}
