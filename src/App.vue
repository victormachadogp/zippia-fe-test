<template>
  <button @click="fetchUsers">Fetch Users</button>
</template>
  
<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const users = ref([])

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error('Failed to fetch users')
        users.value = await response.json()
        console.log(users.value)
      } catch (err) {
        error.value = err.message
      }
    }

    return {
      fetchUsers
    }
  }
}
</script>

<style scoped>
</style>
