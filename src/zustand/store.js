import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


// ::::::::::::::::::::::::::::::::: CREATE EVENT STATE
const initialFormValues = {
  name: '',
  start_date: new Date(),
  end_date: new Date(),
  start_time: '',
  end_time: '',
  ticket_qty: 0,
  ticket_price: 0.00,
  description: '',
  organizer_company_name: '',
  for_contact_phone: '',
  for_contact_email: '',
  source_image: null,
  address: '',
  city: '',
  state: '',
  zipcode: '',
  use_map: false,
  lat: 41.8527,
  lng: 87.6158,
  is_floor: false,
  domain_url: '',
  floorplanMode: 0,
  floorplanImage: null,
  floorplanLayout: [],
  categoryplanLayout: [],
  ticket_variants: [
    {
      ticket_name: '',
      ticket_price: 0.00,
      ticket_description: ''
    }
  ]
};

const useCreateFormStore = create(
  persist(
    (set) => ({
      formValues: initialFormValues,
      setFormValues: (values) => set((state) => ({
        formValues: { ...state.formValues, ...values }
      })),
      resetFormValues: () => set({ formValues: initialFormValues }),
    }),
    {
      name: 'create-form-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);


// ::::::::::::::::::::::::::::::::::::: USER TOKEN STATE
const initialTokenState = {
  authToken: {
    access: '', 
    refresh: ''
  },
  firstname: 'Anonymous',
  profile_image: '',
  is_active: '',
  is_verified: '',
}

export const useTokenState = create(
  persist(
    (set) => ({
      tokenValues: initialTokenState,
      setTokenValues: (values) => set((state) => ({
        tokenValues: { ...state.tokenValues, ...values }
      })),
      resetTokenState: () => set({ tokenValues: initialTokenState }),
    }),
    {
      name: 'token-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCreateFormStore;
