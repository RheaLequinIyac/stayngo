<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div
        class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"
      >
        <h1 class="text-3xl font-bold text-gray-900">
          User Management Dashboard
        </h1>
        <div class="flex space-x-4">
          <button
            @click="fetchData"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh
          </button>
          <button
            @click="showAddModal = true"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New User
          </button>
        </div>
      </div>
    </header>
    <!-- Main Content -->
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Filters -->
        <div class="bg-white shadow mb-6 p-4 rounded-lg">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="w-full md:w-1/4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="search"
              >
                Search
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="search"
                type="text"
                v-model="searchQuery"
                placeholder="Search by name or email"
              />
            </div>
          </div>
        </div>
        <!-- Table -->
        <div class="bg-white shadow overflow-hidden rounded-lg">
          <div class="flex justify-between items-center p-4 border-b">
            <h2 class="text-lg font-medium text-gray-900">Users</h2>
            <span class="text-gray-500">{{ filteredData.length }} results</span>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fullname
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="loading">
                  <td colspan="5" class="px-6 py-4 text-center">Loading...</td>
                </tr>
                <tr v-else-if="filteredData.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center">
                    No users found
                  </td>
                </tr>
                <tr
                  v-for="user in paginatedData"
                  :key="user.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.fullname }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button
                        @click="editUser(user)"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteUser(user)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination -->
          <div
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          >
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="currentPage > 1 ? currentPage-- : null"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                @click="currentPage < totalPages ? currentPage++ : null"
                :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div
              class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
            >
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ startIndex + 1 }}</span>
                  to
                  <span class="font-medium">{{ endIndex }}</span>
                  of
                  <span class="font-medium">{{ filteredData.length }}</span>
                  results
                </p>
              </div>
              <div>
                <nav
                  class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    @click="currentPage > 1 ? currentPage-- : null"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <template v-for="page in totalPages" :key="page">
                    <button
                      @click="currentPage = page"
                      :class="`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === page
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`"
                    >
                      {{ page }}
                    </button>
                  </template>
                  <button
                    @click="currentPage < totalPages ? currentPage++ : null"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- Add/Edit User Modal -->
    <div
      v-if="showAddModal || editingUser"
      class="fixed mt-[100px] flex items-center w-full justify-center z-10 inset-0 overflow-hidden"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-2xl leading-6 font-medium text-gray-900 py-4">
                  {{ editingUser ? "Edit User" : "Add New User" }}
                </h3>
                <div class="mt-2">
                  <form @submit.prevent="saveUser" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Full Name</label
                      >
                      <input
                        type="text"
                        v-model="currentUser.fullname"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Email</label
                      >
                      <input
                        type="email"
                        v-model="currentUser.email"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Role</label
                      >
                      <select
                        v-model="currentUser.role"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="saveUser"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              @click="cancelEdit"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const data = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showAddModal = ref(false);
const editingUser = ref(false);
const currentUser = ref({
  fullname: "",
  email: "",
  role: "user",
});
const fetchData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/users`);
    data.value = response?.data;
  } catch (error) {
    console.log("Error fetching users:", error);
    data.value = [];
  } finally {
    loading.value = false;
  }
};
const filteredData = computed(() => {
  if (!Array.isArray(data.value)) {
    return [];
  }
  return data.value.filter((item) => {
    if (!item) return false;
    const fullName = (item.fullname || "").toLowerCase();
    const email = (item.email || "").toLowerCase();
    const searchTerm = (searchQuery.value || "").toLowerCase();
    return (
      !searchQuery.value ||
      fullName.includes(searchTerm) ||
      email.includes(searchTerm)
    );
  });
});
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value) || 1;
});
const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value;
});
const endIndex = computed(() => {
  return Math.min(
    startIndex.value + itemsPerPage.value,
    filteredData.value.length
  );
});
const editUser = (user) => {
  currentUser.value = { ...user };
  editingUser.value = true;
};

const saveUser = async () => {
  try {
    if (editingUser.value) {
      const response = await axios.put(
        `http://localhost:3000/users/update/${currentUser.value.id}`,
        {
          id: currentUser.value.id,
          fullname: currentUser.value.fullname,
          email: currentUser.value.email,
        }
      );
      toast.success(response?.data?.message || "User updated successfully");
    } else {
      const response = await axios.post(
        "http://localhost:3000/users/create",
        currentUser.value
      );
      toast.success(response?.data?.message || "User created successfully");
    }
    // Refresh data and close modal
    fetchData();
    cancelEdit();
  } catch (error) {
    console.error("Error saving user:", error);
    toast.error("Failed to save user. Please try again.");
  }
};

const deleteUser = async (user) => {
  if (confirm(`Are you sure you want to delete this user: ${user.fullname}?`)) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/users/delete/${user.id}`
      );
      toast.success(response?.data?.message || "User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      fetchData();
    }
  }
};
const cancelEdit = () => {
  showAddModal.value = false;
  editingUser.value = false;
  currentUser.value = {
    fullname: "",
    email: "",
    role: "user",
  };
};
onMounted(() => {
  fetchData();
});
</script>
