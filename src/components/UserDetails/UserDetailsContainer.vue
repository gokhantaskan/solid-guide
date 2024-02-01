<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import type { User } from "@/lib/types";

const props = defineProps<{
  id: string | number;
}>();

const user = ref<User>();

onBeforeMount(async () => {
  try {
    user.value = await getUser(props.id);
  } catch (error) {
    alert(JSON.stringify(error));
  }
});

async function getUser(id: string | number) {
  return await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    .then(json => json);
}
</script>

<template>
  <slot :user="user" />
</template>
