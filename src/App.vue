<template>
  <input v-model="searchUsers" placeholder="Search by name..." @input="filterUsers" />
  <button @click="fetchUsers">Fetch Users</button>

  <p v-if="error" style="color: red">{{ error }}</p>

  <table v-if="hasFilteredUsers">
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
      <tr v-for="user in filteredUsers" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.address.city }}</td>
        <td>{{ user.company.name }}</td>
      </tr>
    </tbody>
  </table>

  <p v-if="!hasFilteredUsers && !loading">No users found.</p>
  <p v-if="loading">Loading...</p>
</template>
  
<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const users = ref([])
    const searchUsers = ref('')
    const loading = ref(false)
    const error = ref(null)

    const fetchUsers = async () => {
      loading.value = true
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error('Failed to fetch users')
        users.value = await response.json()
        console.log(users.value)
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const filterUsers = () => {
      return users.value.filter((user) =>
        user.name.toLowerCase().includes(searchUsers.value.toLowerCase())
      )
    }

    const filteredUsers = computed(() => filterUsers())

    const hasFilteredUsers = computed(() => filteredUsers.value.length > 0)

    return {
      searchUsers,
      fetchUsers,
      filteredUsers,
      hasFilteredUsers,
      loading,
      error
    }
  }
}
</script>

<style scoped>
</style>
