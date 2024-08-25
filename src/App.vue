<template>
  <div class="mt-2 flex flex-row rounded-md px-8">
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
        :disabled="!usersLoaded"
        v-model="searchUsers"
        placeholder="Search by name..."
        @input="filterUsers"
        class="block rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
    <button
      type="button"
      @click="loadUsers"
      class="relative -ml-px bg-white inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      Fetch Users
    </button>
  </div>

  <UserTable v-if="hasFilteredUsers" :users="filteredUsers" @select-user="selectUser" />

  <p v-if="error" class="text-red-500">{{ error }}</p>

  <p v-if="!loading && !usersLoaded && !hasFilteredUsers" class="pl-8 py-10">
    Fetch Users' to load, search and display the user table
  </p>
  <p v-if="!loading && usersLoaded && !hasFilteredUsers" class="pl-8 py-10">No users found.</p>
  <p v-if="loading">Loading...</p>

  <UserModal v-if="selectedUser" :user="selectedUser" @close="closeModal" />
</template>
  
<script>
import { ref, computed } from 'vue'
import UserModal from './components/UserModal.vue'
import UserTable from './components/UserTable.vue'
import { fetchUsers } from '../services'

export default {
  components: {
    UserModal,
    UserTable
  },
  setup() {
    const users = ref([])
    const searchUsers = ref('')
    const loading = ref(false)
    const error = ref(null)
    const selectedUser = ref(null)
    const usersLoaded = ref(false)

    const loadUsers = async () => {
      loading.value = true
      try {
        users.value = await fetchUsers()
        usersLoaded.value = true
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
      loadUsers,
      filteredUsers,
      hasFilteredUsers,
      loading,
      error,
      selectedUser,
      selectUser,
      closeModal,
      usersLoaded
    }
  }
}
</script>

<style scoped>
</style>
