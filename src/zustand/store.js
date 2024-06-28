// useCreateFormStore.js
import { create } from 'zustand';

const useCreateFormStore = create((set) => ({
  formValues: {
    name: '', // done
    start_date: new Date(), // done
    end_date: new Date(), // done
    start_time: '', // done
    end_time: '', // done
    ticket_qty: 0, // done
    ticket_price: 0.00, // done
    description: '', // done
    // ticket_desc: '',
    // ticket_type: '',
    organizer_company_name: '', // done
    for_contact_phone: '', // done
    for_contact_email: '', // done
    source_image: null,
    // location: '',

    // full_address: '',
    address: '', // done
    city: '', // done
    state: '', // done
    zipcode: '', // done
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
