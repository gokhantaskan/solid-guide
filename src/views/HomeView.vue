<script setup lang="ts">
import { ref } from "vue";

import type { User } from "@/lib/types";

const users = ref<User[]>([]);

fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(json => (users.value = json));
</script>

<template>
  <div class="home">
    <h1>
      <RouterLink to="/">Users</RouterLink>
    </h1>

    <ul>
      <RouterLink
        v-for="(user, i) in users.slice(0, 3)"
        :key="i"
        :to="{ name: 'UserView', params: { id: user.id } }"
        custom
        v-slot="{ navigate }"
      >
        <li
          :style="{ cursor: 'pointer' }"
          role="link"
          tabindex="0"
          @click="navigate"
          @keydown.enter="() => navigate"
        >
          {{ user }}
        </li>
      </RouterLink>
    </ul>

    <div>
      <RouterView />
    </div>
  </div>
</template>
