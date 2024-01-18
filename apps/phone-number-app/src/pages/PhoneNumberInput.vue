<template>
    <div :class="$style.wrapper">
        <div :class="$style.title">The ultimate phone number app</div>
        <div :class="$style.instruction">
            Enter your phone number here (without any spaces):
            <input type="text" v-model="newPhoneNumber" data-testid="input">
        </div>
        <div :class="$style.errorMessage" data-testid="errorDiv">
            {{ errorMessagePrecedence }}
        </div>
        <button :class="$style.submitBtn" :disabled="isButtonDisabled" data-testid="submitBtn" @click="updateStore">Submit</button>
    </div>
</template>

<script>
// TODO - move all pages to their own folders

import { usePhoneNumberStore } from '../stores/user.js'
import { mapStores, mapWritableState } from 'pinia'


export default {
    name: 'PhoneNumberInput',
    data() {
        return {
            newPhoneNumber: '',
        }
    },
    computed: {
        // TODO - use mapWritableState key renaming
        ...mapStores(usePhoneNumberStore),
        ...mapWritableState(usePhoneNumberStore, [
            'phoneNumber'
        ]),
        isFieldEmpty() {
            const errorMessage = 'Please enter a phone number'
            if (this.newPhoneNumber === '') {
                return true
            }
        },
        isNotOnlyNumbers() {
            // TODO - string method / regex for finding alpha numeric characters
            const errorMessage = 'Please only enter numbers'
            let numberFromInput = Number(this.newPhoneNumber)
            if (Number.isNaN(numberFromInput)) {
                return true
            }
            if (this.newPhoneNumber.includes('.') || this.newPhoneNumber.includes(' ') || this.newPhoneNumber.includes('-')) {
                return true
            }
        },
        lessThan11Digits() {
            const errorMessage = 'Please enter 11 digits'
            if (this.newPhoneNumber.length < 11) {
                return true
            }
        },
        moreThan11Digits() {
            const errorMessage = 'Ahaah!! Too many digits detected. Please enter only 11 digits.'
            if (this.newPhoneNumber.length > 11) {
                return true
            }
        },
        errorMessagePrecedence() {
            // TODO: make data driven (with J <3)
            const errorMessage1 = 'Please enter a phone number'
            const errorMessage2 = 'Please only enter numbers'
            const errorMessage3 = 'Please enter 11 digits'
            const errorMessage4 = 'Ahaah!! Too many digits detected. Please enter only 11 digits.'

            if (this.isFieldEmpty) {
                return errorMessage1
            }
            if (this.isNotOnlyNumbers) {
                return errorMessage2
            }
            if (this.lessThan11Digits) {
                return errorMessage3
            }
            if (this.moreThan11Digits) {
                return errorMessage4
            }
            if (!this.isFieldEmpty && !this.isNotOnlyNumbers && !this.lessThan11Digits && !this.moreThan11Digits) {
                return null
            }
        },
        isButtonDisabled() {
            if (this.errorMessagePrecedence === null) {
                return false
            } else {
                return true
            }
        },
    },
    methods: {
        updateStore() {
            this.phoneNumber = this.newPhoneNumber
            this.$router.push('/stats')
        },
    }
}

</script>

<style module src="./PhoneNumberInput.css"></style>
