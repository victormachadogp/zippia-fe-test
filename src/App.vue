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

  <!-- <div class="px-4 sm:px-6 lg:px-8">
    <div v-if="hasFilteredUsers" class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Username
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    City
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Company
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">More</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="user in filteredUsers" :key="user.id">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ user.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.username }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.email }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.address.city }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ user.company.name }}
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <button class="text-indigo-600 hover:text-indigo-900" @click="selectUser(user)">
                      More
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <p v-if="error" style="color: red">{{ error }}</p>

  <p class="pl-8 py-10" v-if="!hasFilteredUsers && !loading">No users found.</p>
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

    const loadUsers = async () => {
      loading.value = true
      try {
        users.value = await fetchUsers()
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
      loadUsers,
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
</style>
