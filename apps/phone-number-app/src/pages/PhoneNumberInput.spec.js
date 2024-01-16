import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import PhoneNumberInput from './PhoneNumberInput.vue' 

describe('phone number input page', () => {
    const errorMessage1 = 'Please enter a phone number'
    const errorMessage2 = 'Please only enter numbers'
    const errorMessage3 = 'Please enter 11 digits'
    const errorMessage4 = 'Ahaah!! Too many digits detected. Please enter only 11 digits.'


    it('displays the input and submit button', () => {
        const wrapper = mount(PhoneNumberInput)
        const input = wrapper.find('[data-testid="input"]')
        const submitBtn = wrapper.find('[data-testid="submitBtn"]')

        expect(input.exists()).toBe(true)
        expect(submitBtn.exists()).toBe(true)
    })

    it('displays no error messages when the input has 11 digits', async () => {
        const wrapper = mount(PhoneNumberInput)
        const input = wrapper.find('[data-testid="input"]')
        await input.setValue('12345678901')
        
        const errorDiv = wrapper.find('[data-testid="errorDiv"]')
        expect(errorDiv.text()).toEqual('')

        // const submitBtn = wrapper.find('[data-testid="submitBtn"]')
        // expect(submitBtn.attributes().disabled).toBe(false)
    })

    it('displays error message 1 when the field is empty', async () => {
        const wrapper = mount(PhoneNumberInput)
        const input = wrapper.find('[data-testid="input"]')
        input.setValue('')

        const errorDiv = wrapper.find('[data-testid="errorDiv"]')

        expect(errorDiv.text().includes(errorMessage1)).toBe(true)
        expect(errorDiv.text().includes(errorMessage2)).toBe(false)
        expect(errorDiv.text().includes(errorMessage3)).toBe(false)
        expect(errorDiv.text().includes(errorMessage4)).toBe(false)

        // await wrapper.vm.$nextTick()

        // const submitBtn = wrapper.find('[data-testid="submitBtn"]')
        
        // console.log(submitBtn.attributes())
        // expect(submitBtn.attributes().disabled).toBe(true)
    }),

    it('displays error message 2 when any non-number characters are entered', async () => {
        const wrapper = mount(PhoneNumberInput)
        const input = wrapper.find('[data-testid="input"]')
        const badInput1 = '12g456'
        const badInput2 = '1,234567890'
        const badInput3 = '12345 67'
        const badInput4 = '12345678.9012'

        const errorDiv = wrapper.find('[data-testid="errorDiv"]')

        await input.setValue(badInput1)
        expect(errorDiv.text().includes(errorMessage2)).toBe(true)

        await input.setValue(badInput2)
        expect(errorDiv.text().includes(errorMessage2)).toBe(true)

        await input.setValue(badInput3)
        expect(errorDiv.text().includes(errorMessage2)).toBe(true)

        await input.setValue(badInput4)
        expect(errorDiv.text().includes(errorMessage2)).toBe(true)

    }),

    it('if no non-number characters have been entered: displays error message 3 if the input is shorter than 11 digits and error message 4 if the input is longer than 11 digits', async () => {
        const wrapper = mount(PhoneNumberInput)
        const input = wrapper.find('[data-testid="input"]')
        const badInput1 = '12345'
        const badInput2 = '123456789012345'

        const errorDiv = wrapper.find('[data-testid="errorDiv"]')

        await input.setValue(badInput1)
        expect(errorDiv.text().includes(errorMessage3)).toBe(true)
        expect(errorDiv.text().includes(errorMessage4)).toBe(false)

        await input.setValue(badInput2)
        expect(errorDiv.text().includes(errorMessage3)).toBe(false)
        expect(errorDiv.text().includes(errorMessage4)).toBe(true)

    })
    
})