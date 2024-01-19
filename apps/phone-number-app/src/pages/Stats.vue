<template>
    <div :class="$style.wrapper">
        <div :class="$style.title">
            Here are the most peculiar stats with regards to your phone number:
        </div>
        <div :class="$style.contents">
            <div :class="$style.QaWrapper">
                This is how long your phone number is (how curious):
                <span :class="$style.magicalAnswer">{{ howManyDigits }}</span>
            </div>
                
            <div :class="$style.QaWrapper">
                This is it in reverse (simply magical):
                <span :class="$style.magicalAnswer">{{ numberReversed }}</span>
            </div>
                
            <div :class="$style.QaWrapper">
                This is what the digits add up to (mindblowing, I know):
                <span :class="$style.magicalAnswer"> {{ sumDigits }}</span>
            </div>
                
            <div :class="$style.QaWrapper">
                This is what it looks like with a hyphen between each number (wibble-wobble Bob's your uncle):
                <span :class="$style.magicalAnswer">{{ hyphenateNumber }}</span>
            </div>
        </div>
    </div>

</template>

<script>
import { usePhoneNumberStore } from '@/stores/user';
import { mapStores, mapWritableState } from 'pinia';

export default {
    name: 'Stats',
    computed: {
        ...mapStores(usePhoneNumberStore),
        ...mapWritableState(usePhoneNumberStore, [
            'phoneNumber'
        ]),
        howManyDigits() {
            return this.phoneNumber.length
        },
        numberReversed() {
            return this.phoneNumber.split('').reverse().join('')
        },
        sumDigits() {
            // TODO - use reduce() (array function)
            const digitsArray = [...this.phoneNumber]
            let sum = 0
            for (let i = 0; i < digitsArray.length; i++) {
                let digitsInNumbers = Number(digitsArray[i])
                sum += digitsInNumbers
            }
            return sum
        },
        hyphenateNumber() {
            const digitsArray = this.phoneNumber.split('')
            for (let i = 0; i < digitsArray.length - 1; i++) {
                digitsArray[i] += '-'
            }
            const hyphenateNumber = digitsArray.join('')
            return hyphenateNumber
        },
    }
}

</script>

<style module src="./Stats.css"></style>