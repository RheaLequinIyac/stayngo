<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-blue-700 to-blue-900 py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center text-center text-white">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p class="text-lg md:text-xl max-w-2xl">
            We're here to help with any questions about your booking needs.
          </p>
        </div>
      </div>
    </section>
    <!-- Contact Form and Info -->
    <section class="container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Contact Form -->
          <div class="lg:w-2/3">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form
              @submit.prevent="submitForm"
              class="bg-white rounded-lg shadow-md p-6 md:p-8"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    for="firstName"
                    class="block text-gray-700 text-sm font-medium mb-2"
                    >First Name *</label
                  >
                  <input
                    type="text"
                    id="firstName"
                    v-model="form.firstName"
                    class="w-full px-4 py-3 rounded-md border"
                    :class="{
                      'border-gray-300': !errors.firstName,
                      'border-red-500': errors.firstName,
                    }"
                    placeholder="Your first name"
                  />
                  <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">
                    {{ errors.firstName }}
                  </p>
                </div>
                <div>
                  <label
                    for="lastName"
                    class="block text-gray-700 text-sm font-medium mb-2"
                    >Last Name *</label
                  >
                  <input
                    type="text"
                    id="lastName"
                    v-model="form.lastName"
                    class="w-full px-4 py-3 rounded-md border"
                    :class="{
                      'border-gray-300': !errors.lastName,
                      'border-red-500': errors.lastName,
                    }"
                    placeholder="Your last name"
                  />
                  <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">
                    {{ errors.lastName }}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-medium mb-2"
                    >Email Address *</label
                  >
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    class="w-full px-4 py-3 rounded-md border"
                    :class="{
                      'border-gray-300': !errors.email,
                      'border-red-500': errors.email,
                    }"
                    placeholder="your.email@example.com"
                  />
                  <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                    {{ errors.email }}
                  </p>
                </div>
                <div>
                  <label
                    for="phone"
                    class="block text-gray-700 text-sm font-medium mb-2"
                    >Phone Number</label
                  >
                  <input
                    type="tel"
                    id="phone"
                    v-model="form.phone"
                    class="w-full px-4 py-3 rounded-md border border-gray-300"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              <div class="mb-6">
                <label
                  for="subject"
                  class="block text-gray-700 text-sm font-medium mb-2"
                  >Subject *</label
                >
                <select
                  id="subject"
                  v-model="form.subject"
                  class="w-full px-4 py-3 rounded-md border"
                  :class="{
                    'border-gray-300': !errors.subject,
                    'border-red-500': errors.subject,
                  }"
                >
                  <option value="" disabled>Please select a subject</option>
                  <option value="booking">Booking Question</option>
                  <option value="reservation">Reservation Support</option>
                  <option value="cancellation">Cancellation Request</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
                <p v-if="errors.subject" class="text-red-500 text-sm mt-1">
                  {{ errors.subject }}
                </p>
              </div>
              <div class="mb-6">
                <label
                  for="message"
                  class="block text-gray-700 text-sm font-medium mb-2"
                  >Message *</label
                >
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  class="w-full px-4 py-3 rounded-md border"
                  :class="{
                    'border-gray-300': !errors.message,
                    'border-red-500': errors.message,
                  }"
                  placeholder="Please provide details about your inquiry..."
                ></textarea>
                <p v-if="errors.message" class="text-red-500 text-sm mt-1">
                  {{ errors.message }}
                </p>
              </div>
              <div class="flex items-start mb-6">
                <div class="flex items-center h-5">
                  <input
                    id="privacy"
                    type="checkbox"
                    v-model="form.privacyPolicy"
                    class="w-4 h-4 border rounded"
                    :class="{
                      'border-gray-300': !errors.privacyPolicy,
                      'border-red-500': errors.privacyPolicy,
                    }"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="privacy" class="text-gray-600"
                    >I agree to the
                    <a href="#" class="text-blue-600 hover:underline"
                      >Privacy Policy</a
                    >
                    and consent to SkyStay processing my data.</label
                  >
                </div>
              </div>
              <p v-if="errors.privacyPolicy" class="text-red-500 text-sm mb-4">
                {{ errors.privacyPolicy }}
              </p>
              <button
                type="submit"
                class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
              >
                Submit Message
              </button>
            </form>
          </div>
          <!-- Contact Information -->
          <contactDetailsBlock />
        </div>
      </div>
    </section>
    <!-- Map Section -->
    <mapBlock />

    <!-- FAQ -->
    <faqBlock />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import faqBlock from "@/components/blocks/faqBlock.vue";
import mapBlock from "@/components/blocks/mapBlock.vue";
import contactDetailsBlock from "@/components/blocks/contactDetailsBlock.vue";

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  privacyPolicy: false,
});

const errors = reactive({});
const validateForm = () => {
  errors.firstName = form.firstName ? "" : "First name is required.";
  errors.lastName = form.lastName ? "" : "Last name is required.";
  errors.email = form.email ? "" : "Email is required.";
  errors.subject = form.subject ? "" : "Subject is required.";
  errors.message = form.message ? "" : "Message is required.";
  errors.privacyPolicy = form.privacyPolicy
    ? ""
    : "You must agree to the Privacy Policy.";
  return Object.values(errors).every((error) => !error);
};

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/queries", {
      firstname: form.firstName,
      lastname: form.lastName,
      email: form.email,
      phone_number: form.phone,
      subject: form.subject,
      message: form.message,
    });

    alert("Thank you for your message! We will get back to you soon.");
    Object.keys(form).forEach((key) => {
      form[key] = key === "privacyPolicy" ? false : "";
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("An error occurred while submitting the form. Please try again.");
  }
};
</script>
