<template>
  <div class="mt-2 flex rounded-md">
    <div class="relative flex focus-within:z-10">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z"
          />
        </svg>
      </div>
      <input
        v-model="searchUsers"
        placeholder="Search by name..."
        @input="filterUsers"
        class="block rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
    <button
      type="button"
      @click="fetchUsers"
      class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      Fetch Users
    </button>
  </div>

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
