<script setup lang="ts">
import UserDetailsContainer from "./UserDetailsContainer.vue";
import UserDetailsPresentation from "./UserDetailsPresentation.vue";

defineProps<{
  id: string | number;
}>();
</script>

<template>
  <UserDetailsContainer
    :id="id"
    v-slot="{ user }"
  >
    <UserDetailsPresentation :user="user" />
  </UserDetailsContainer>
</template>
