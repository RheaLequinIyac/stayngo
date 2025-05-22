<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div
        class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center"
      >
        <h1 class="text-3xl font-bold text-gray-900">
          Hotel Reservation Admin Dashboard
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
            Add New Reservation
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500 truncate">
                Total Reservations
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ data.length }}
              </dd>
            </div>
          </div>
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500 truncate">
                Rooms In Use
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ data.length }}
              </dd>
            </div>
          </div>
          <!-- <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500 truncate">
                Upcoming Check-ins
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ upcomingCheckIns.length }}
              </dd>
            </div>
          </div> -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500 truncate">
                Room Occupancy
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ Math.round((occupiedRooms.length / totalRooms) * 100) }}%
              </dd>
            </div>
          </div>
        </div>

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
            <div class="w-full md:w-1/4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="roomFilter"
              >
                Room Number
              </label>
              <select
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="roomFilter"
                v-model="roomFilter"
              >
                <option value="">All Rooms</option>
                <option v-for="room in uniqueRooms" :key="room" :value="room">
                  {{ room }}
                </option>
              </select>
            </div>
            <div class="w-full md:w-1/4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="dateFrom"
              >
                Check-in From
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dateFrom"
                type="date"
                v-model="dateFrom"
              />
            </div>
            <div class="w-full md:w-1/4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="dateTo"
              >
                Check-in To
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dateTo"
                type="date"
                v-model="dateTo"
              />
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white shadow overflow-hidden rounded-lg">
          <div class="flex justify-between items-center p-4 border-b">
            <h2 class="text-lg font-medium text-gray-900">Reservations</h2>
            <span class="text-gray-500">{{ filteredData.length }} results</span>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <!-- <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th> -->
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Guest Name
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
                    Room
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Guests
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Check-in
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Check-out
                  </th>
                  <!-- <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th> -->
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
                  <td colspan="9" class="px-6 py-4 text-center">Loading...</td>
                </tr>
                <tr v-else-if="filteredData.length === 0">
                  <td colspan="9" class="px-6 py-4 text-center">
                    No reservations found
                  </td>
                </tr>
                <tr
                  v-for="reservation in paginatedData"
                  :key="reservation.id"
                  class="hover:bg-gray-50"
                >
                  <!-- <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ (i += 1) }}
                  </td> -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                      {{ reservation.firstname }} {{ reservation.lastname }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ reservation.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ reservation.room_number }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ reservation.no_individual }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(reservation.check_in) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(reservation.check_out) }}
                  </td>
                  <!-- <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
                        reservation
                      )}`"
                    >
                      {{ getStatus(reservation) }}
                    </span>
                  </td> -->
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button
                        @click="editReservation(reservation)"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        @click="checkInGuest(reservation)"
                        v-if="canCheckIn(reservation)"
                        class="text-green-600 hover:text-green-900"
                      >
                        Check In
                      </button>
                      <button
                        @click="checkOutGuest(reservation)"
                        v-if="canCheckOut(reservation)"
                        class="text-orange-600 hover:text-orange-900"
                      >
                        Check Out
                      </button>
                      <button
                        @click="deleteReservation(reservation)"
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

    <!-- Add/Edit Reservation Modal -->
    <div
      v-if="showAddModal || editingReservation"
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
                  {{
                    editingReservation
                      ? "Edit Reservation"
                      : "Add New Reservation"
                  }}
                </h3>
                <div class="mt-2">
                  <form @submit.prevent="saveReservation" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >First Name</label
                        >
                        <input
                          type="text"
                          v-model="currentReservation.firstname"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Last Name</label
                        >
                        <input
                          type="text"
                          v-model="currentReservation.lastname"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Email</label
                      >
                      <input
                        type="email"
                        v-model="currentReservation.email"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Number of Guests</label
                        >
                        <input
                          type="number"
                          v-model="currentReservation.no_individual"
                          min="1"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Room Number</label
                        >
                        <input
                          type="number"
                          v-model="currentReservation.room_number"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Check-in Date</label
                        >
                        <input
                          type="date"
                          v-model="checkinDate"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Check-out Date</label
                        >
                        <input
                          type="date"
                          v-model="checkoutDate"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="saveReservation"
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

const totalRooms = 50;

const data = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const roomFilter = ref("");
const dateFrom = ref("");
const dateTo = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showAddModal = ref(false);
const editingReservation = ref(false);
const currentReservation = ref({
  firstname: "",
  lastname: "",
  email: "",
  no_individual: 1,
  room_number: "",
  check_in: "",
  check_out: "",
});

// Computed properties for date inputs in the form
const checkinDate = computed({
  get: () => {
    if (!currentReservation.value.check_in) return "";
    return new Date(currentReservation.value.check_in)
      .toISOString()
      .split("T")[0];
  },
  set: (val) => {
    currentReservation.value.check_in = val ? new Date(val).toISOString() : "";
  },
});

const checkoutDate = computed({
  get: () => {
    if (!currentReservation.value.check_out) return "";
    return new Date(currentReservation.value.check_out)
      .toISOString()
      .split("T")[0];
  },
  set: (val) => {
    currentReservation.value.check_out = val ? new Date(val).toISOString() : "";
  },
});

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/reservations`);
    data.value = response?.data?.data;
  } catch (error) {
    console.log("Error setting data:", error);
    data.value = [];
  } finally {
    loading.value = false;
  }
};

const today = computed(() => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0];
});

const uniqueRooms = computed(() => {
  if (!Array.isArray(data.value)) {
    return [];
  }
  const rooms = data.value.map((item) => item.room_number).filter(Boolean);
  return [...new Set(rooms)].sort((a, b) => a - b);
});

const filteredData = computed(() => {
  if (!Array.isArray(data.value)) {
    return [];
  }

  return data.value.filter((item) => {
    if (!item) return false;

    const fullName = `${item.firstname || ""} ${
      item.lastname || ""
    }`.toLowerCase();
    const email = (item.email || "").toLowerCase();
    const searchTerm = (searchQuery.value || "").toLowerCase();
    const searchMatch =
      !searchQuery.value ||
      fullName.includes(searchTerm) ||
      email.includes(searchTerm);
    const roomMatch =
      !roomFilter.value || item.room_number === parseInt(roomFilter.value);

    // Date filter
    let dateMatch = true;
    if (dateFrom.value && item.check_in) {
      dateMatch =
        dateMatch && new Date(item.check_in) >= new Date(dateFrom.value);
    }
    if (dateTo.value && item.check_in) {
      dateMatch =
        dateMatch && new Date(item.check_in) <= new Date(dateTo.value);
    }

    return searchMatch && roomMatch && dateMatch;
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

const currentGuests = computed(() => {
  const now = new Date();
  if (!Array.isArray(data.value)) {
    return [];
  }
  return data.value.filter((item) => {
    if (!item || !item.check_in || !item.check_out) return false;
    return new Date(item.check_in) <= now && new Date(item.check_out) >= now;
  });
});

const upcomingCheckIns = computed(() => {
  const now = new Date();
  if (!Array.isArray(data.value)) {
    return [];
  }
  return data.value.filter((item) => {
    if (!item || !item.check_in) return false;
    return new Date(item.check_in) > now;
  });
});

const occupiedRooms = computed(() => {
  const now = new Date();
  if (!Array.isArray(data.value)) {
    return [];
  }
  return data.value
    .filter((item) => {
      if (!item || !item.check_in || !item.check_out) return false;
      return new Date(item.check_in) <= now && new Date(item.check_out) >= now;
    })
    .map((item) => item.room_number)
    .filter(Boolean);
});

// Methods
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatus = (reservation) => {
  if (!reservation || !reservation.check_in || !reservation.check_out) {
    return "Unknown";
  }

  const now = new Date();
  const checkIn = new Date(reservation.check_in);
  const checkOut = new Date(reservation.check_out);

  if (checkIn > now) {
    return "Upcoming";
  } else if (checkOut < now) {
    return "Completed";
  } else {
    return "Active";
  }
};

const getStatusClasses = (reservation) => {
  const status = getStatus(reservation);
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "Upcoming":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const canCheckIn = (reservation) => {
  const now = new Date();
  const checkIn = new Date(reservation.check_in);
  const checkOut = new Date(reservation.check_out);

  // Can check in if today is check-in day and not checked in yet
  return (
    checkIn <= now && checkOut >= now && getStatus(reservation) !== "Active"
  );
};

const canCheckOut = (reservation) => {
  // Can check out if currently active
  return getStatus(reservation) === "Active";
};

const checkInGuest = async (reservation) => {
  try {
    // Implement check-in logic here
    console.log("Checking in guest:", reservation);
    // In a real implementation, you would update the status in your database
  } catch (error) {
    console.error("Error checking in guest:", error);
  }
};

const checkOutGuest = async (reservation) => {
  try {
    // Implement check-out logic here
    console.log("Checking out guest:", reservation);
    // In a real implementation, you would update the status in your database
  } catch (error) {
    console.error("Error checking out guest:", error);
  }
};

const deleteReservation = async (reservation) => {
  if (
    confirm(
      `Are you sure you want to delete this reservation for ${reservation.firstname} ${reservation.lastname}?`
    )
  ) {
    try {
      console.log("Deleting reservation:", reservation);
      const response = await axios.delete(
        `http://localhost:3000/reservations/delete/${reservation.id}`
      );
      toast.success(
        response?.data?.message || "Reservation deleted successfully"
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
    } finally {
      fetchData();
    }
  }
};

const editReservation = (reservation) => {
  currentReservation.value = { ...reservation };
  editingReservation.value = true;
};

const saveReservation = async () => {
  try {
    if (editingReservation.value) {
      // Update existing reservation
      const response = await axios.put(
        `http://localhost:3000/reservations/update/${currentReservation.value.id}`,
        {
          firstname: currentReservation.value.firstname,
          lastname: currentReservation.value.lastname,
          email: currentReservation.value.email,
          no_individual: currentReservation.value.no_individual,
          room_number: currentReservation.value.room_number,
          check_in: extractDateOnly(currentReservation.value.check_in),
          check_out: extractDateOnly(currentReservation.value.check_out),
        }
      );
      toast.success(
        response?.data?.message || "Reservation updated successfully"
      );
    } else {
      // Create new reservation
      const response = await axios.post(
        "http://localhost:3000/reservations/create",
        currentReservation.value
      );
      toast.success(
        response?.data?.message || "Reservation created successfully"
      );
    }

    // Refresh data and close modal
    fetchData();
    cancelEdit();
  } catch (error) {
    console.error("Error saving reservation:", error);
    toast.error("Failed to save reservation. Please try again.");
  }
};

function extractDateOnly(isoString) {
  return isoString.split("T")[0];
}

const cancelEdit = () => {
  showAddModal.value = false;
  editingReservation.value = false;
  currentReservation.value = {
    firstname: "",
    lastname: "",
    email: "",
    no_individual: 1,
    room_number: "",
    check_in: "",
    check_out: "",
  };
};

onMounted(() => {
  fetchData();
});
</script>
