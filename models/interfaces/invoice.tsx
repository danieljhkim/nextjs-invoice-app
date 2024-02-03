export interface Address {
  street: string | undefined,
  city: string | undefined,
  postCode: string | undefined,
  country: string | undefined
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export type Status = 'pending' | 'draft' | 'paid' | undefined;

export interface Invoice {
  id?: string | undefined;
  createdAt?: string | undefined;
  paymentDue?: string | undefined;
  description?: string | undefined;
  paymentTerms?: number;
  clientName?: string | undefined;
  clientEmail?: string | undefined;
  status?: Status | undefined;
  senderAddress?: Address;
  clientAddress?: Address;
  items?: Item[];
  total?: number | undefined;
} 