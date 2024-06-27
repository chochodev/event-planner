// useCreateFormStore.js
import { create } from 'zustand';

const useCreateFormStore = create((set) => ({
  formValues: {
    name: '', // done
    start_date: new Date(),
    end_date: new Date(),
    start_time: '',
    end_time: '',
    ticket_qty: 0, // done
    ticket_price: 0.00, // done
    description: '', // done
    ticket_desc: '',
    ticket_type: '',
    organizer_company_name: '',
    for_contact_phone: '',
    for_contact_email: '',
    source_image: null,
    location: '',
    full_address: '',
    lat: 41.8527,
    lng: 87.6158,
    is_floor: 0,
    domain_url: '',

    // ::::::::::: floor plan mode
    floorplanMode: '',
    floorplanImage: null,
    floorplanLayout: [],

    // ::::::::::: ticket variant
    ticket_variants: [
      {
        ticket_name: '',
        ticket_price: 0.00,
        ticket_description: ''
      }
    ]
  },
  setFormValues: (values) => set((state) => ({
    formValues: { ...state.formValues, ...values }
  })),
}));

export default useCreateFormStore;
