<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
</script>

<template>
    <div class="flex aspect-square size-8 items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-600 text-sidebar-primary-foreground">
        <AppLogoIcon class="size-5 fill-current text-blue dark:text-black" />
    </div>
    <div class="ml-1 grid flex-1 text-left text-sm">
        <span class="mb-0.5 truncate font-semibold leading-none text-blue-800">Vue Tasks</span>
    </div>
</template>
