<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    @click="sortBy('name')"
                    class="cursor-pointer py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                    <span v-if="currentSortColumn === 'name'">
                      {{ currentSortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th
                    scope="col"
                    @click="sortBy('username')"
                    class="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Username
                    <span v-if="currentSortColumn === 'username'">
                      {{ currentSortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th
                    scope="col"
                    @click="sortBy('email')"
                    class="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                    <span v-if="currentSortColumn === 'email'">
                      {{ currentSortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th
                    scope="col"
                    @click="sortBy('address.city')"
                    class="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    City
                    <span v-if="currentSortColumn === 'address.city'">
                      {{ currentSortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th
                    scope="col"
                    @click="sortBy('company.name')"
                    class="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Company
                    <span v-if="currentSortColumn === 'company.name'">
                      {{ currentSortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">More</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="user in sortedUsers" :key="user.id">
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
                    <button
                      class="text-indigo-600 hover:text-indigo-900"
                      @click="$emit('select-user', user)"
                    >
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
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    const currentSortColumn = ref('name')
    const currentSortDirection = ref('asc')

    const sortBy = (column) => {
      if (currentSortColumn.value === column) {
        currentSortDirection.value = currentSortDirection.value === 'asc' ? 'desc' : 'asc'
      } else {
        currentSortColumn.value = column
        currentSortDirection.value = 'asc'
      }
    }

    const sortedUsers = computed(() => {
      return [...props.users].sort((a, b) => {
        let aValue = columnValue(a, currentSortColumn.value)
        let bValue = columnValue(b, currentSortColumn.value)

        if (aValue < bValue) return currentSortDirection.value === 'asc' ? -1 : 1
        if (aValue > bValue) return currentSortDirection.value === 'asc' ? 1 : -1
        return 0
      })
    })

    const columnValue = (user, column) => {
      return column.split('.').reduce((obj, key) => obj[key], user)
    }

    return {
      currentSortColumn,
      currentSortDirection,
      sortBy,
      sortedUsers
    }
  }
}
</script>
