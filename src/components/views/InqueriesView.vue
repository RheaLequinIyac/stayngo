<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-white shadow">
        <div
          class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"
        >
          <h1 class="text-3xl font-bold text-gray-900">
            Hotel Inquiries Dashboard
          </h1>
          <button
            @click="fetchInquiries"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh
          </button>
        </div>
      </header>
  
      <!-- Main Content -->
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Filters -->
          <div class="bg-white shadow mb-6 p-4 rounded-lg">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="w-full md:w-1/3">
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
                  placeholder="Search by name, email, or subject"
                />
              </div>
              <!-- <div class="w-full md:w-1/3">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="statusFilter"
                >
                  Status
                </label>
                <select
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="statusFilter"
                  v-model="statusFilter"
                >
                  <option value="">All Flags</option>
                  <option value="1">Flagged</option>
                  <option value="0">Unflagged</option>
                </select>
              </div> -->
            </div>
          </div>
  
          <!-- Table -->
          <div class="bg-white shadow overflow-hidden rounded-lg">
            <div class="flex justify-between items-center p-4 border-b">
              <h2 class="text-lg font-medium text-gray-900">Inquiries</h2>
              <span class="text-gray-500"
                >{{ filteredInquiries.length }} results</span
              >
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
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
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subject
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
                    <td colspan="6" class="px-6 py-4 text-center">Loading...</td>
                  </tr>
                  <tr v-else-if="filteredInquiries.length === 0">
                    <td colspan="6" class="px-6 py-4 text-center">
                      No inquiries found
                    </td>
                  </tr>
                  <tr
                    v-for="inquiry in paginatedInquiries"
                    :key="inquiry.id"
                    class="hover:bg-gray-50"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">
                        {{ inquiry.firstname }} {{ inquiry.lastname }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ inquiry.email }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ inquiry.phone_number }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ inquiry.subject }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-2">
                        <button
                          @click="openMessageModal(inquiry)"
                          class="text-blue-600 hover:text-blue-900"
                        >
                          View Message
                        </button>
                        <!-- <button
                          @click="openResolveModal(inquiry)"
                          class="text-green-600 hover:text-green-900"
                          v-if="inquiry.flag === 1"
                        >
                          Resolve
                        </button> -->
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Message Modal -->
      <div
        v-if="messageModalOpen"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <div class="fixed inset-0 bg-black opacity-50" @click="closeMessageModal"></div>
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg z-10">
          <div class="flex justify-between items-center border-b pb-3 mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              Inquiry Message
            </h3>
            <button
              @click="closeMessageModal"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div v-if="selectedInquiry">
            <div class="mb-4">
              <p class="text-sm text-gray-500 mb-1">From:</p>
              <p class="text-gray-900">
                {{ selectedInquiry.firstname }} {{ selectedInquiry.lastname }}
                ({{ selectedInquiry.email }})
              </p>
            </div>
            <div class="mb-4">
              <p class="text-sm text-gray-500 mb-1">Subject:</p>
              <p class="text-gray-900">{{ selectedInquiry.subject }}</p>
            </div>
            <div class="mb-4">
              <p class="text-sm text-gray-500 mb-1">Message:</p>
              <p class="text-gray-900 whitespace-pre-line">
                {{ selectedInquiry.message }}
              </p>
            </div>
            <div class="mb-4">
              <p class="text-sm text-gray-500 mb-1">Phone Number:</p>
              <p class="text-gray-900">{{ selectedInquiry.phone_number }}</p>
            </div>
            <div class="mb-4">
              <p class="text-sm text-gray-500 mb-1">Status:</p>
              <p
                :class="{
                  'text-red-600': selectedInquiry.flag === 1,
                  'text-green-600': selectedInquiry.flag === 0,
                }"
              >
                {{ selectedInquiry.flag === 1 ? "Flagged" : "Resolved" }}
              </p>
            </div>
          </div>
          <div class="flex justify-end border-t pt-3 mt-4">
            <button
              @click="closeMessageModal"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Close
            </button>
            <!-- <button
              v-if="selectedInquiry && selectedInquiry.flag === 1"
              @click="openResolveModal(selectedInquiry)"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Resolve
            </button> -->
          </div>
        </div>
      </div>
  
      <!-- Resolve Modal -->
      <div
        v-if="resolveModalOpen"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <div class="fixed inset-0 bg-black opacity-50" @click="closeResolveModal"></div>
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg z-10">
          <div class="flex justify-between items-center border-b pb-3 mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              Resolve Inquiry
            </h3>
            <button
              @click="closeResolveModal"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div v-if="selectedInquiry">
            <p class="mb-4">
              Are you sure you want to mark this inquiry as resolved?
            </p>
            <div class="bg-gray-100 p-4 rounded mb-4">
              <div class="mb-2">
                <span class="font-medium">From: </span>
                {{ selectedInquiry.firstname }} {{ selectedInquiry.lastname }}
              </div>
              <div class="mb-2">
                <span class="font-medium">Subject: </span>
                {{ selectedInquiry.subject }}
              </div>
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="resolution-notes"
              >
                Resolution Notes (Optional)
              </label>
              <textarea
                id="resolution-notes"
                v-model="resolutionNotes"
                rows="3"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Add any notes about how this inquiry was resolved..."
              ></textarea>
            </div>
          </div>
          <div class="flex justify-end border-t pt-3 mt-4">
            <button
              @click="closeResolveModal"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              @click="resolveInquiry"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              :disabled="resolvingInquiry"
            >
              {{ resolvingInquiry ? "Resolving..." : "Confirm Resolution" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // filepath: /home/clifford/Documents/hci-app/front/src/components/views/InqueriesView.vue
  import { ref, computed, onMounted } from "vue";
  import axios from "axios";
  
  const inquiries = ref([]);
  const loading = ref(true);
  const searchQuery = ref("");
  const statusFilter = ref("");
  
  // Modal states
  const messageModalOpen = ref(false);
  const resolveModalOpen = ref(false);
  const selectedInquiry = ref(null);
  const resolutionNotes = ref("");
  const resolvingInquiry = ref(false);
  
  const fetchInquiries = async () => {
    loading.value = true;
    try {
      const response = await axios.get("http://localhost:3000/queries");
      // Ensure inquiries.value is set to the array of inquiries
      inquiries.value = response.data.data || [];
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      inquiries.value = []; // Fallback to an empty array in case of error
    } finally {
      loading.value = false;
    }
  };
  
  const filteredInquiries = computed(() => {
    return inquiries.value.filter((inquiry) => {
      const matchesSearch =
        !searchQuery.value ||
        `${inquiry.firstname} ${inquiry.lastname}`
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        inquiry.subject.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesStatus =
        !statusFilter.value || inquiry.flag.toString() === statusFilter.value;
      return matchesSearch && matchesStatus;
    });
  });
  
  const paginatedInquiries = computed(() => {
    return filteredInquiries.value; // Add pagination logic if needed
  });
  
  // Modal functions
  const openMessageModal = (inquiry) => {
    selectedInquiry.value = inquiry;
    messageModalOpen.value = true;
  };
  
  const closeMessageModal = () => {
    messageModalOpen.value = false;
    selectedInquiry.value = null;
  };
  
  const openResolveModal = (inquiry) => {
    selectedInquiry.value = inquiry;
    resolveModalOpen.value = true;
    // Close message modal if it's open
    if (messageModalOpen.value) {
      messageModalOpen.value = false;
    }
  };
  
  const closeResolveModal = () => {
    resolveModalOpen.value = false;
    selectedInquiry.value = null;
    resolutionNotes.value = "";
  };
  
  const resolveInquiry = async () => {
    if (!selectedInquiry.value) return;
    
    resolvingInquiry.value = true;
    try {
      await axios.put(`http://localhost:3000/inquiries/${selectedInquiry.value.id}`, {
        flag: 0,
        resolution_notes: resolutionNotes.value || null,
      });
      
      // Update the inquiry in the local array
      const index = inquiries.value.findIndex(i => i.id === selectedInquiry.value.id);
      if (index !== -1) {
        inquiries.value[index].flag = 0;
        inquiries.value[index].resolution_notes = resolutionNotes.value || null;
      }
      
      // Close the modal
      closeResolveModal();
    } catch (error) {
      console.error("Error resolving inquiry:", error);
      alert("Failed to resolve inquiry. Please try again.");
    } finally {
      resolvingInquiry.value = false;
    }
  };
  
  onMounted(() => {
    fetchInquiries();
  });
  </script>