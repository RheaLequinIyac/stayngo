<template>
  <div>
    <div class="fixed inset-0 bg-black/50 z-[1001]" @click="close"></div>

    <div
      class="fixed right-0 top-0 bottom-0 z-[1002] w-full max-w-md slide-in-right"
    >
      <div
        class="bg-white shadow-md p-4 sm:p-6 h-full flex flex-col overflow-auto"
      >
        <!-- Header with close button -->
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-800">
            Room Reservation
          </h1>
          <button
            @click="close"
            class="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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

        <!-- Form content -->
        <form
          @submit.prevent="submitForm"
          class="space-y-4 flex-1 overflow-y-auto"
        >
          <!-- Personal Information -->
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
              Personal Information
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  for="firstName"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >First Name</label
                >
                <input
                  type="text"
                  id="firstName"
                  v-model="formData.firstName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  for="lastName"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Last Name</label
                >
                <input
                  type="text"
                  id="lastName"
                  v-model="formData.lastName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="formData.email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <!-- Reservation Details -->
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
              Reservation Details
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  for="checkIn"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Check-in Date</label
                >
                <input
                  type="date"
                  id="checkIn"
                  v-model="formData.checkIn"
                  :min="today"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  for="checkOut"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Check-out Date</label
                >
                <input
                  type="date"
                  id="checkOut"
                  v-model="formData.checkOut"
                  :min="formData.checkIn || today"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                for="guests"
                class="block text-sm font-medium text-gray-700 mb-1"
                >Number of Guests</label
              >
              <input
                type="number"
                id="guests"
                v-model="formData.guests"
                min="1"
                max="10"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Room Details -->
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">
              Room Details
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  for="roomCategory"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Room Category</label
                >
                <select
                  id="roomCategory"
                  v-model="formData.roomCategory"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @change="parentToggle(formData.roomCategory)"
                >
                  <option value="" disabled>Select a category</option>
                  <option
                    v-for="category in roomCategories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  for="roomType"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Room Type</label
                >
                <select
  id="roomType"
  v-model="formData.roomType"
  @change="changeRoom(formData.roomType)"
>
  <option value="" disabled>Select a type</option>
  <option
    v-for="type in filteredRoomTypes"
    :key="type.id"
    :value="type"
  >
    {{ type.name }}
  </option>
</select>

                <div v-if="selectedRoom?.price">
                <p class="text-sm text-gray-600">
                Rate per night: <span class="font-semibold">₱{{ selectedRoom.price }}</span>
                </p>
              </div>

              </div>
              <div>
                <div>
  <label
    for="totalPrice"
    class="block text-sm font-medium text-gray-700 mb-1"
    >Total Price</label
  >
  <input
    type="text"
    id="totalPrice"
    :value="`₱${totalPrice.toFixed(2)}`"
    disabled
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

              </div>
              <div>
                <label
                  for="capacity"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Maximum Capacity</label
                >
                <input
                  disabled
                  type="number"
                  id="capacity"
                  v-model="selectedRoom.capacity"
                  min="1"
                  max="10"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Submit button -->
          <div class="pt-4 sticky bottom-0 bg-white pb-4">
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Complete Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();

const today = new Date().toISOString().split("T")[0];

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
});

const props = defineProps({
  close: {
    type: Function,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});
// Removed duplicate changeRoom function to resolve redeclaration error

const submitForm = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/reservations/create",
      {
        firstname: formData.value.firstName,
        lastname: formData.value.lastName,
        email: formData.value.email,
        check_in: formData.value.checkIn,
        check_out: formData.value.checkOut,
        no_individual: formData.value.guests,
        room_number: selectedRoom.value.id,
        total_price: totalPrice.value,

      }
    );

    if (response.status === 200 || response.status === 201) {
      toast.success("Reservation completed successfully!");
      formData.value = {
        firstName: "",
        lastName: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
      };
      selectedRoom.value = {};
    } else {
      toast.error("Failed to complete reservation. Please try again later.");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to complete reservation. Please try again later.");
  } finally {
    props.close();
  }
};

const rooms = ref([]);
const roomCategories = ref([]);
const roomType = ref([]);
const parentId = ref(0);
const selectedRoom = ref({});


const parentToggle = (e) => {
  parentId.value = e;
};
const changeRoom = (selected) => {
  const roomPrices = {
    "Standard One Bed": 199,
    "Standard Two Bed": 249,
    "Premium One Bed": 289,
    "Premium Two Bed": 389,
    "single room": 199,  // match this to actual name shown in roomType
  };

  if (selected && typeof selected === 'object') {
    selectedRoom.value = {
      ...selected,                            // clone object
      price: roomPrices[selected.name] || 0,  // attach price
    };
  } else {
    selectedRoom.value = {}; // reset if no selection
  }
};


const totalPrice = computed(() => {
  const checkInDate = new Date(formData.value.checkIn);
  const checkOutDate = new Date(formData.value.checkOut);

  if (!selectedRoom.value?.price || isNaN(checkInDate) || isNaN(checkOutDate)) {
    return 0;
  }

  const timeDiff = checkOutDate - checkInDate;
  const nights = timeDiff > 0 ? timeDiff / (1000 * 60 * 60 * 24) : 0;

  return nights * selectedRoom.value.price;
});


const getRooms = async () => {
  try {
    const response = await axios.get("http://localhost:3000/rooms");
    rooms.value = response?.data || [];

    response?.data?.forEach((e) => {
      if (e?.parent_id === 0) {
        roomCategories.value.push(e);
      } else {
        roomType.value.push(e);
      }
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    toast.error("Failed to fetch rooms. Please try again later.");
  }
};

const filteredRoomTypes = computed(() => {
  return roomType.value.filter((type) => type.parent_id === parentId.value);
});

onMounted(() => {
  getRooms();
});
</script>
