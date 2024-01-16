<template>
    <div :class="$style.wrapper">
        <div :class="$style.title">The ultimate phone number app</div>
        <div :class="$style.instruction">
            Enter your phone number here (without any spaces):
            <input type="text" v-model="phoneNumber" data-testid="input">
        </div>
        <div :class="$style.errorMessage" data-testid="errorDiv">
            {{ errorMessagePrecedence }}
        </div>
        <button :class="$style.submitBtn" :disabled="isButtonDisabled" data-testid="submitBtn">Submit</button>
    </div>
</template>

<script>

export default {
    name: 'PhoneNumberInput',
    data() {
        return {
            phoneNumber: '',
        }
    },
    computed: {
        isFieldEmpty() {
            const errorMessage = 'Please enter a phone number'
            if (this.phoneNumber === '') {
                return true
            }
        },
        isNotOnlyNumbers() {
            const errorMessage = 'Please only enter numbers'
            let numberFromInput = Number(this.phoneNumber)
            if (Number.isNaN(numberFromInput)) {
                return true
            }
            if (this.phoneNumber.includes('.') || this.phoneNumber.includes(' ') || this.phoneNumber.includes('-')) {
                return true
            }
        },
        lessThan11Digits() {
            const errorMessage = 'Please enter 11 digits'
            if (this.phoneNumber.length < 11) {
                return true
            }
        },
        moreThan11Digits() {
            const errorMessage = 'Ahaah!! Too many digits detected. Please enter only 11 digits.'
            if (this.phoneNumber.length > 11) {
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
    }
}

</script>

<style module src="./PhoneNumberInput.css"></style>
