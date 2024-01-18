import PhoneNumberInput from '../pages/PhoneNumberInput.vue'
import Stats from '../pages/Stats.vue'

export default [
    {
        path: '/',
        name: 'phone-number-input',
        component: PhoneNumberInput
    },
    {
        path: '/stats',
        name: 'stats',
        component: Stats
    }
]

// TODO - make /stats a page that is only visitable when a phoneNumber has been set