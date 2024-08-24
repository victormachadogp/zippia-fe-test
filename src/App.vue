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
        <th></th>
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
        <td><button @click="selectUser(user)">More</button></td>
      </tr>
    </tbody>
  </table>

  <p v-if="!hasFilteredUsers && !loading">No users found.</p>
  <p v-if="loading">Loading...</p>

  <div v-if="selectedUser" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close" @click="closeModal"></span>
      <h2>{{ selectedUser.name }}</h2>
      <p><strong>Username:</strong> {{ selectedUser.username }}</p>
      <p><strong>Email:</strong> {{ selectedUser.email }}</p>
      <p><strong>Phone:</strong> {{ selectedUser.phone }}</p>
      <p>
        <strong>Address:</strong> {{ selectedUser.address.street }},
        {{ selectedUser.address.suite }}, {{ selectedUser.address.city }},
        {{ selectedUser.address.zipcode }}
      </p>
      <p>
        <strong>Company:</strong> {{ selectedUser.company.name }} -
        {{ selectedUser.company.catchPhrase }}
      </p>
    </div>
  </div>
</template>
  
<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const users = ref([])
    const searchUsers = ref('')
    const loading = ref(false)
    const error = ref(null)
    const selectedUser = ref(null)

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

    const selectUser = (user) => {
      selectedUser.value = user
    }

    const closeModal = () => {
      selectedUser.value = null
    }

    return {
      searchUsers,
      fetchUsers,
      filteredUsers,
      hasFilteredUsers,
      loading,
      error,
      selectedUser,
      selectUser,
      closeModal
    }
  }
}
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  max-width: 90%;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
}
</style>
