<template>
    <div :class="$style.wrapper">
        <div :class="$style.contentWrapper">
            <router-link to="/" :class="$style.routerLink">Home</router-link>
            <router-link to="/stats" :class="$style.routerLink">Stats</router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TopBar',
}
</script>

<style module src="./TopBar.css"></style>