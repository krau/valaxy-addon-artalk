<script setup lang="ts">
import { useArtalkWithOptions } from "../client";
import 'artalk/dist/Artalk.css'

useArtalkWithOptions();
</script>

<template>
    <div id="ArtalkComment" w="full" />
</template>