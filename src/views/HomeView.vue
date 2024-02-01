<script setup lang="ts">
import { ref } from "vue";

import UserDetails from "@/components/UserDetails/UserDetails.vue";
import type { User } from "@/lib/types";

const users = ref<User[]>([]);
const isLoading = ref(false);
const isDialogOpen = ref(false);
const currentUserId = ref<string | number | null>(null);

(async () => {
  isLoading.value = true;

  try {
    users.value = await getUsers();
  } catch (error) {
    alert(JSON.stringify(error));
  }

  isLoading.value = false;
})();

async function getUsers() {
  return await fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(json => json);
}

function handleOpenDialog(id: string | number) {
  currentUserId.value = id;
  isDialogOpen.value = true;
  const currentState = history.state;
  history.pushState(currentState, "", `/users/${currentUserId.value}`);
}

function handleCloseDialog() {
  currentUserId.value = null;
  isDialogOpen.value = false;
  history.back();
}
</script>

<template>
  <div class="home">
    <h1>
      <RouterLink to="/">Users</RouterLink>
    </h1>

    <ul>
      <template
        v-for="(user, i) in users"
        :key="i"
      >
        <li
          :style="{ cursor: 'pointer' }"
          role="link"
          tabindex="0"
          @click="handleOpenDialog(user.id)"
        >
          {{ user.name }}
        </li>
      </template>
    </ul>

    <VDialog
      v-if="isDialogOpen && currentUserId"
      :model-value="true"
      :close-on-back="false"
      max-width="500"
      @click:outside="handleCloseDialog"
    >
      <VCard>
        <template #text>
          <UserDetails :id="currentUserId" />
        </template>
      </VCard>
    </VDialog>
  </div>
</template>
