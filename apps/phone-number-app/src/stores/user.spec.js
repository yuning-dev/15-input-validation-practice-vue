import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { usePhoneNumberStore } from "./user";
import PhoneNumberInput from '../pages/PhoneNumberInput.vue'

describe('phone number store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('updates the phoneNumber variable from the store when the submit button is clicked', async () => {
        const wrapper = mount(PhoneNumberInput)
        const input = wrapper.find('[data-testid="input"]')
        await input.setValue('12345678901')

        const submitBtn = wrapper.find('[data-testid="submitBtn"]')
        await submitBtn.trigger('click')

        const phoneNumbers = usePhoneNumberStore()
        expect(phoneNumbers.phoneNumberVar). toEqual(input.element.value)
    })
    

})