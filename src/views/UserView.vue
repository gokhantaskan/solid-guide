<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import type { User } from "@/lib/types";

const props = defineProps<{
  id: string;
}>();

const router = useRouter();
const user = ref<User>();
const isLoading = ref(false);

watch(
  () => props.id,
  async id => {
    isLoading.value = true;

    try {
      user.value = await getUsers(id);
    } catch (error) {
      alert(JSON.stringify(error));
    }

    isLoading.value = false;
  },
  {
    immediate: true,
  }
);

async function getUsers(id: string) {
  return await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    .then(json => json);
}

function closeModal() {
  router.push({ name: "HomeView" });
}
</script>

<template>
  <VDialog
    :model-value="true"
    :close-on-back="false"
    @click:outside="closeModal"
    max-width="500"
  >
    <VCard>
      <template #text>
        {{ isLoading ? "..." : user }}
      </template>
    </VCard>
  </VDialog>
</template>
