import { defineStore } from 'pinia'

export const usePhoneNumberStore = defineStore('phoneNumbers', {
    state: () => ({
        phoneNumber: '',
    }),
})