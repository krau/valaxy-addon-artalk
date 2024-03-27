<script setup lang="ts">
import { useArtalkWithOptions } from "../client";
import 'artalk/dist/Artalk.css'
import '../client/styles/index.scss'

useArtalkWithOptions();
</script>

<template>
    <div id="ArtalkComment" w="full" />
</template>