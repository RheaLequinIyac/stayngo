<template>
  <div>
    <div class="bg-gray-50 min-h-screen">
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div class="container mx-auto px-4">
          <div class="flex flex-col items-center text-center text-white">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Hotel Stay
            </h1>
            <p class="text-lg md:text-xl max-w-2xl mb-8">
              Discover amazing places to stay around the world with exclusive
              deals and the best prices.
            </p>
          </div>
        </div>
      </section>

      <!-- Search Box -->
      <div class="container mx-auto px-4 -mt-8">
        <div class="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div
            class="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4"
          >
            <div class="flex-1">
              <label class="block text-gray-700 text-sm font-medium mb-2"
                >Check-in</label
              >
              <div class="relative">
                <input
                  type="date"
                  v-model="checkInDate"
                  class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i
                  class="far fa-calendar absolute right-3 top-3 text-gray-400"
                ></i>
              </div>
            </div>

            <div class="flex-1">
              <label class="block text-gray-700 text-sm font-medium mb-2"
                >Check-out</label
              >
              <div class="relative">
                <input
                  type="date"
                  v-model="checkOutDate"
                  class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i
                  class="far fa-calendar absolute right-3 top-3 text-gray-400"
                ></i>
              </div>
            </div>

            <div class="flex-1">
              <label class="block text-gray-700 text-sm font-medium mb-2"
                >Guests</label
              >
              <div class="relative">
                <select
                  v-model="guests"
                  class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests</option>
                </select>
                <i
                  class="fas fa-chevron-down absolute right-3 top-3 text-gray-400"
                ></i>
              </div>
            </div>
    
              <div>
                <button
                  @click="bookNow"
                  class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 w-full md:w-auto"
                >
                  Book Now
                </button>
              </div>
          </div>
        </div>
      </div>

      <!-- Featured Destinations -->
      <section class="container mx-auto px-4 py-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Our Rooms
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(destination, index) in popularDestinations"
            :key="index"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              :src="destination.image"
              :alt="destination.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-xl font-semibold text-gray-800">
                {{ destination.name }}
              </h3>
              <div class="flex justify-between items-center mt-2">
                <div class="flex items-center">
                  <i class="fas fa-star text-yellow-400"></i>
                  <span class="ml-1 text-gray-600">{{ destination.rating }}</span>
                </div>
                <p class="text-blue-600 font-bold">{{ destination.price }}</p>
              </div>
              <!-- <button
                @click="bookNow"
                class="mt-3 w-full bg-blue-100 text-blue-600 py-2 rounded hover:bg-blue-200 transition duration-300"
              >
                Book Now
              </button> -->
            </div>
          </div>
        </div>
      </section>

      <!-- Special Offers -->
      <section class="bg-blue-50 py-12">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Special Offers
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                class="bg-red-600 text-white py-1 px-3 text-sm font-medium inline-block absolute"
              >
                SAVE 25%
              </div>
              <img
                src="/img/gateaway.jpg"
                alt="Special offer"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800">
                  Weekend Getaway Package
                </h3>
                <p class="text-gray-600 mt-2">
                  Enjoy a perfect weekend with our special package including
                  breakfast and spa access.
                </p>
                <div class="flex justify-between items-center mt-4">
                  <p class="text-gray-500">
                    <s>₱299</s>
                    <span class="text-blue-600 font-bold ml-2">₱224</span>
                  </p>

                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                class="bg-green-600 text-white py-1 px-3 text-sm font-medium inline-block absolute"
              >
                FAMILY DEAL
              </div>
              <img
                src="/img/family.jpg"
                alt="Family offer"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800">
                  Family Vacation Bundle
                </h3>
                <p class="text-gray-600 mt-2">
                  Perfect for families - kids stay free and receive complimentary
                  activities.
                </p>
                <div class="flex justify-between items-center mt-4">
                  <p class="text-blue-600 font-bold">From ₱399</p>
                
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                class="bg-purple-600 text-white py-1 px-3 text-sm font-medium inline-block absolute"
              >
                EXTENDED STAY
              </div>
              <img
                src="/img/stay.jpg"
                alt="Extended stay offer"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800">
                  Stay Longer, Save More
                </h3>
                <p class="text-gray-600 mt-2">
                  Book 5+ nights and receive up to 30% discount plus free airport
                  transfer.
                </p>
                <div class="flex justify-between items-center mt-4">
                  <p class="text-blue-600 font-bold">Save 30%</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Us -->
      <section class="container mx-auto px-4 py-12">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Why Book With SkyStay
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center text-center">
            <div
              class="bg-blue-100 p-4 rounded-full mb-4 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-blue-600"
                width="24"
                height="24"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Best Price Guarantee
            </h3>
            <p class="text-gray-600">
              Find a lower price? We'll match it and give you an additional 10%
              off.
            </p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div
              class="bg-blue-100 p-4 rounded-full mb-4 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-blue-600"
                width="24"
                height="24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Secure Booking
            </h3>
            <p class="text-gray-600">
              Your payment and personal information are protected with SSL
              encryption.
            </p>
          </div>
          <div class="flex flex-col items-center text-center">
            <div
              class="bg-blue-100 p-4 rounded-full mb-4 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-blue-600 w-6 h-6"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
            <p class="text-gray-600">
              Our customer service team is available around the clock to assist
              you.
            </p>
          </div>
        </div>
      </section>
    </div>
    <div v-if="isOpen">
      <ReservationForm :close="toggleForm" :isOpen="isOpen" />
    </div>
    <div
      :class="[
        'fixed bottom-0 right-0 p-[18px] rounded-full m-[24px] bg-gray-300 hover:cursor-pointer',
        countdown === 1 ? 'shake-horizontal' : '',
      ]"
      @click="bookNow"
    >
      <Book />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import ReservationForm from "../popups/ReservationForm.vue";
import Book from "@/assets/icons/book.vue";
import { useDefaultStore } from "@/components/store/defaultState.js";

const defaultStore = useDefaultStore();

const toast = useToast();

const router = useRouter();
// Reactive state
const destination = ref("");
const checkInDate = ref(new Date().toISOString().split("T")[0]);
const checkOutDate = ref(
  new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0]
);
const guests = ref("2");
const email = ref("");
const isOpen = ref(false);

const bookNow = () => {
  if (!defaultStore.isLogged) {
    toast.error("Please login to book a hotel");
    router.push("/login");
  } else {
    toggleForm();
  }
};

const toggleForm = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.body.style.overflow = "hidden"; // Disable scrolling
  } else {
    document.body.style.overflow = "auto"; // Enable scrolling
  }
};

// Data
const popularDestinations = ref([
  {
    name: "Standard One Bed",
    image: "/img/oneBed.webp",
    rating: "4.8",
    price: "From ₱199",
  },
  {
    name: "Standard Two Bed",
    image: "/img/twoBed.webp",
    rating: "4.7",
    price: "From ₱249",
  },
  {
    name: "Premium One Bed",
    image: "/img/pOneBed.jpeg",
    rating: "4.9",
    price: "From ₱289",
  },
  {
    name: "Premium Two Bed",
    image: "/img/pTwoBed.jpeg",
    rating: "4.6",
    price: "From ₱389",
  },
]);

const countdown = ref(5);

const startCountdown = () => {
  setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      countdown.value = 5; // Reset countdown
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  clearInterval(startCountdown);
});
</script>

<style scoped></style>
