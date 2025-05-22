<template>
  <section class="bg-gray-100 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div class="space-y-4">
          <div
            class="bg-white rounded-lg shadow-md p-6"
            v-for="(faq, index) in faqs"
            :key="index"
          >
            <button
              @click="toggleFaq(index)"
              class="flex justify-between items-center w-full text-left hover:underline"
            >
              <h3 class="text-lg font-semibold text-gray-800">
                {{ faq.question }}
              </h3>
              <i
                :class="[
                  'fas',
                  faq.open ? 'fa-chevron-up' : 'fa-chevron-down',
                  'text-blue-600',
                ]"
              ></i>
            </button>
            <div v-show="faq.open" class="mt-4 text-gray-600">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
        <div class="mt-10 text-center">
          <p class="text-gray-700 mb-4">
            Still have questions? We're happy to help!
          </p>
          <button
            class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
          >
            View All FAQs
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const faqs = ref([
  {
    question: "How do I cancel or modify my reservation?",
    answer:
      'You can cancel or modify your reservation by logging into your account and navigating to "My Bookings". Alternatively, you can contact our customer support team via phone or email with your booking reference.',
    open: true,
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and in some regions, we also offer payment via bank transfer or digital wallets like Apple Pay and Google Pay.",
    open: false,
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, we use industry-standard encryption and security protocols to protect your payment information. We are PCI DSS compliant and never store your complete credit card details on our servers.",
    open: false,
  },
  {
    question: "How can I get a receipt for my booking?",
    answer:
      "A receipt is automatically sent to your email address after completing a booking. You can also find and download receipts by logging into your account and viewing your booking history.",
    open: false,
  },
]);
// Toggle FAQ open/close
const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open;
};
</script>
