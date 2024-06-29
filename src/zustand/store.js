// // useCreateFormStore.js
// import { create } from 'zustand';

// const useCreateFormStore = create((set) => ({
//   formValues: {
//     source_image: null, // done

//     is_floor: 0,  // done
//     domain_url: '', // done

//     // ::::::::::: floor plan mode
//     floorplanMode: '',
//     floorplanImage: null,
//     floorplanLayout: [],

//   },

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCreateFormStore = create(
  persist(
    (set) => ({
      formValues: {
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
      },
      setFormValues: (values) => set((state) => ({
        formValues: { ...state.formValues, ...values }
      })),
    }),
    {
      name: 'create-form-storage', 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCreateFormStore;
