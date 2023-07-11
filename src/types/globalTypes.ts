export type IPizza = {
  id: string;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

export type ICartItem = {
  pizzaId: number | string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type IOrder = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: ICartItem[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status?: string;
};

export type IMapPosition = {
  latitude: string | number;
  longitude: string | number;
};

export type ILocationInfo = {
  latitude: number;
  longitude: number;
  continent: string;
  lookupSource: string;
  continentCode: string;
  localityLanguageRequested: string;
  city: string;
  countryName: string;
  countryCode: string;
  postcode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  plusCode: string;
  locality: string;
  localityInfo: {
    LikelyLand: boolean;
    administrative: any[];
    informative: {
      name: string;
      description: string;
      order: number;
      wikidataId?: string;
      geonameId?: number;
    }[];
  };
};

export type ILoaderParams = {
  id: string;
};
