<template>
  <div
    v-if="user"
    @click="closeModal"
    class="relative z-10"
    role="dialog"
    aria-modal="true"
    @click.stop
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="min-w-[500px] relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
        >
          <div>
            <div class="mx-auto flex h items-center justify-center rounded-ful">
              <div>
                <h2 class="text-xl pb-3">{{ user.name }}</h2>
                <div class="flex flex-col gap-3">
                  <p><span class="font-semibold">Username:</span> {{ user.username }}</p>
                  <p><span class="font-semibold">Email:</span> {{ user.email }}</p>
                  <p><span class="font-semibold">Phone:</span> {{ user.phone }}</p>
                  <p>
                    <span class="font-semibold">Address:</span> {{ user.address.street }},
                    {{ user.address.suite }}, {{ user.address.city }},
                    {{ user.address.zipcode }}
                  </p>
                  <p>
                    <span class="font-semibold">Company:</span> {{ user.company.name }} -
                    {{ user.company.catchPhrase }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
