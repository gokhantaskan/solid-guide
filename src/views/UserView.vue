<script setup lang="ts">
import { toRef, ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { User } from "@/lib/types";

const route = useRoute();
const userId = toRef(() => route.params.id as string);

const user = ref<User>();
const isLoading = ref(false);

watch(
  userId,
  async id => {
    isLoading.value = true;

    try {
      user.value = await fetchUser(id as string);
    } catch (error) {
      alert(JSON.stringify(error));
    }

    isLoading.value = false;
  },
  {
    immediate: true,
    flush: "pre",
  }
);

async function fetchUser(id: string) {
  return await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    .then(json => json);
}
</script>

<template>
  <div v-if="isLoading">...</div>
  <div v-else-if="!user">Sh*t happens</div>
  <div v-else>{{ user }}</div>
</template>
