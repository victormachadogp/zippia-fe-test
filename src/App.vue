<template>
  <button @click="fetchUsers">Fetch Users</button>

  <p v-if="error" style="color: red">{{ error }}</p>

  <table v-if="users.length">
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Phone</th>
        <th>City</th>
        <th>Company</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.address.city }}</td>
        <td>{{ user.company.name }}</td>
      </tr>
    </tbody>
  </table>
</template>
  
<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const users = ref([])
    const loading = ref(false)
    const error = ref('')

    const fetchUsers = async () => {
      loading.value = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users1')
        if (!response.ok) throw new Error('Failed to fetch users')
        users.value = await response.json()
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    return {
      users,
      fetchUsers,
      error
    }
  }
}
</script>

<style scoped>
</style>
