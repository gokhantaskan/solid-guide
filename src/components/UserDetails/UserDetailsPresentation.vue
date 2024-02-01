<script setup lang="ts">
import type { User } from "@/lib/types";

defineProps<{
  user: User | undefined;
}>();
</script>

<template>
  <div>{{ user ?? "..." }}</div>
</template>
