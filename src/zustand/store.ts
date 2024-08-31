import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ::::::::::::::::::::::::::::::::: CREATE EVENT TYPE
interface EventFormValues {
  name: string;
  start_date: Date;
  end_date: Date;
  start_time: string;
  end_time: string;
  ticket_qty: number;
  ticket_price: number;
  description: string;
  organizer_company_name: string;
  for_contact_phone: string;
  for_contact_email: string;
  source_image: File | null;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  use_map: boolean;
  lat: number;
  lng: number;
  is_floor: boolean;
  domain_url: string;
  floorplanMode: number;
  floorplanImage: File | null;
  floorplanLayout: unknown[];
  categoryplanLayout: unknown[];
  ticket_variants: {
    ticket_name: string;
    ticket_price: number;
    ticket_description: string;
  }[];
}


// ::::::::::::::::::::::::::::::::: CREATE EVENT STATE
const initialFormValues: EventFormValues = {
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

export default useCreateFormStore;

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
      setTokenValues: (values) => {
        set((state) => {
          const newTokenValues = { ...state.tokenValues, ...values };
          return { tokenValues: newTokenValues };
        });
      },
      resetTokenState: () => set({ tokenValues: initialTokenState }),
    }),
    {
      name: 'token-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);


// :::::::::::::::::::::::::::::::: LAYOUT STATE
const initialLayoutState = {
  openFlashMessage: false,
  flashMessage: '',
  flashSeverity: '',
  loginLoading: false,
}

export const useLayoutState = create(
  (set) => ({
    layoutValues: initialLayoutState,
    setLayoutValues: (values) => {
      set((state) => {
        const newLayoutValues = { ...state.layoutValues, ...values };
        return { layoutValues: newLayoutValues };
      });
    },
    resetLayoutState: () => set({ layoutValues: initialLayoutState }),
  })
);

