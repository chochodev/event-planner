// useCreateFormStore.js
import { create } from 'zustand';

const useCreateFormStore = create((set) => ({
  formValues: {
    name: '',
    start_date: new Date(),
    end_date: new Date(),
    start_time: '',
    end_time: '',
    ticket_qty: 0,
    ticket_price: 0.00,
    description: '',
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
    floorplanLayout: []
  },
  setFormValues: (values) => set((state) => ({
    formValues: { ...state.formValues, ...values }
  })),
}));

export default useCreateFormStore;
