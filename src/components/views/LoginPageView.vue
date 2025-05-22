<!-- App.vue -->
<template>
  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12"
  >
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl">
      <div class="p-6">
        <!-- Logo/Icon -->
        <div class="flex justify-center mb-8">
          <div
            class="inline-block w-12 h-12 bg-blue-600 rounded-full items-center justify-center"
          >
            <i class="fas fa-user text-white text-xl"></i>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="flex border-b border-gray-200 mb-6">
          <button
            @click="activeTab = 'login'"
            class="py-2 px-4 font-medium text-sm transition-colors duration-200"
            :class="
              activeTab === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            "
          >
            Login
          </button>
          <button
            @click="activeTab = 'register'"
            class="py-2 px-4 font-medium text-sm transition-colors duration-200"
            :class="
              activeTab === 'register'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            "
          >
            Register
          </button>
        </div>

        <!-- Login Form -->
        <div v-if="activeTab === 'login'">
          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <label
                for="email"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Email Address</label
              >
              <input
                type="email"
                id="email"
                v-model="loginForm.email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
              <p v-if="errors.loginEmail" class="mt-1 text-sm text-red-600">
                {{ errors.loginEmail }}
              </p>
            </div>

            <div class="mb-6">
              <label
                for="password"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Password</label
              >
              <div class="relative">
                <input
                  :type="showLoginPassword ? 'text' : 'password'"
                  id="password"
                  v-model="loginForm.password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  @click="showLoginPassword = !showLoginPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i
                    :class="
                      showLoginPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                    "
                    class="text-gray-500"
                  ></i>
                </button>
              </div>
              <p v-if="errors.loginPassword" class="mt-1 text-sm text-red-600">
                {{ errors.loginPassword }}
              </p>
            </div>

            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  v-model="loginForm.remember"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="remember" class="ml-2 block text-sm text-gray-700"
                  >Remember me</label
                >
              </div>
              <div>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-800"
                  >Forgot password?</a
                >
              </div>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
              :disabled="isLoading"
            >
              <span v-if="isLoading">
                <i class="fas fa-spinner fa-spin mr-2"></i>Loading...
              </span>
              <span v-else>Sign In</span>
            </button>
          </form>

       
        </div>

        <!-- Register Form -->
        <div v-if="activeTab === 'register'">
          <form @submit.prevent="handleRegister">
            <div class="mb-4">
              <label
                for="name"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Full Name</label
              >
              <input
                type="text"
                id="name"
                v-model="registerForm.name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
              <p v-if="errors.registerName" class="mt-1 text-sm text-red-600">
                {{ errors.registerName }}
              </p>
            </div>

            <div class="mb-4">
              <label
                for="register-email"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Email Address</label
              >
              <input
                type="email"
                id="register-email"
                v-model="registerForm.email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
              <p v-if="errors.registerEmail" class="mt-1 text-sm text-red-600">
                {{ errors.registerEmail }}
              </p>
            </div>

            <div class="mb-4">
              <label
                for="register-password"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Password</label
              >
              <div class="relative">
                <input
                  :type="showRegisterPassword ? 'text' : 'password'"
                  id="register-password"
                  v-model="registerForm.password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  @click="showRegisterPassword = !showRegisterPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i
                    :class="
                      showRegisterPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                    "
                    class="text-gray-500"
                  ></i>
                </button>
              </div>
              <p
                v-if="errors.registerPassword"
                class="mt-1 text-sm text-red-600"
              >
                {{ errors.registerPassword }}
              </p>
            </div>

            <div class="mb-6">
              <label
                for="confirm-password"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Confirm Password</label
              >
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirm-password"
                  v-model="registerForm.confirmPassword"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i
                    :class="
                      showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                    "
                    class="text-gray-500"
                  ></i>
                </button>
              </div>
              <p
                v-if="errors.confirmPassword"
                class="mt-1 text-sm text-red-600"
              >
                {{ errors.confirmPassword }}
              </p>
            </div>

            <div class="mb-6">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  v-model="registerForm.acceptTerms"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="terms" class="ml-2 block text-sm text-gray-700">
                  I agree to the
                  <a href="#" class="text-blue-600 hover:underline"
                    >Terms of Service</a
                  >
                  and
                  <a href="#" class="text-blue-600 hover:underline"
                    >Privacy Policy</a
                  >
                </label>
              </div>
              <p v-if="errors.acceptTerms" class="mt-1 text-sm text-red-600">
                {{ errors.acceptTerms }}
              </p>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
              :disabled="isLoading"
            >
              <span v-if="isLoading">
                <i class="fas fa-spinner fa-spin mr-2"></i>Loading...
              </span>
              <span v-else>Create Account</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useDefaultStore } from "@/components/store/defaultState.js";
import { useRouter } from "vue-router";

const defaultStore = useDefaultStore();

const router = useRouter();
const toast = useToast();

const activeTab = ref("login");
const isLoading = ref(false);
const showLoginPassword = ref(false);
const showRegisterPassword = ref(false);
const showConfirmPassword = ref(false);

const loginForm = reactive({
  email: "",
  password: "",
  remember: false,
});

const registerForm = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const errors = reactive({
  loginEmail: "",
  loginPassword: "",
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  confirmPassword: "",
  acceptTerms: "",
});

const validateLoginForm = () => {
  let valid = true;

  // Reset errors
  errors.loginEmail = "";
  errors.loginPassword = "";

  // Email validation
  if (!loginForm.email) {
    errors.loginEmail = "Email is required";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
    errors.loginEmail = "Please enter a valid email address";
    valid = false;
  }

  // Password validation
  if (!loginForm.password) {
    errors.loginPassword = "Password is required";
    valid = false;
  } else if (loginForm.password.length < 6) {
    errors.loginPassword = "Password must be at least 6 characters";
    valid = false;
  }

  return valid;
};

const validateRegisterForm = () => {
  let valid = true;

  // Reset errors
  errors.registerName = "";
  errors.registerEmail = "";
  errors.registerPassword = "";
  errors.confirmPassword = "";
  errors.acceptTerms = "";

  // Name validation
  if (!registerForm.name) {
    errors.registerName = "Name is required";
    valid = false;
  }

  // Email validation
  if (!registerForm.email) {
    errors.registerEmail = "Email is required";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
    errors.registerEmail = "Please enter a valid email address";
    valid = false;
  }

  // Password validation
  if (!registerForm.password) {
    errors.registerPassword = "Password is required";
    valid = false;
  } else if (registerForm.password.length < 6) {
    errors.registerPassword = "Password must be at least 6 characters";
    valid = false;
  }

  // Confirm password validation
  if (!registerForm.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
    valid = false;
  } else if (registerForm.password !== registerForm.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    valid = false;
  }

  // Terms acceptance validation
  if (!registerForm.acceptTerms) {
    errors.acceptTerms =
      "You must accept the Terms of Service and Privacy Policy";
    valid = false;
  }

  return valid;
};

const handleLogin = async () => {
  if (!validateLoginForm()) return;

  try {
    isLoading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await axios.post("http://localhost:3000/users/login", {
      username: loginForm.email,
      password: loginForm.password,
    });

    if (response.status === 200 && response.data) {
      defaultStore.toggleLogin();
      console.log(response);
      defaultStore.setRole(response.data.role)
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/");
      }, 1100);
    } else {
      throw new Error(response.data?.message || "Login failed");
    }
  } catch (error) {
    toast.error("Login failed: " + error?.response?.data?.error);
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async () => {
  if (!validateRegisterForm()) return;

  isLoading.value = true;

  try {
    const response = await axios.post("http://localhost:3000/users/register", {
      fullname: registerForm.name,
      username: registerForm.email,
      email: registerForm.email,
      password: registerForm.password,
    });

    if (response.status === 200 || response.status === 201) {
      toast.success("Registration successful!");
      console.log("Registration successful with:", registerForm);
      activeTab.value = "login";
    } else {
      throw new Error(response.data?.message || "Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error);
    const errorMsg =
      error?.response?.data?.error || error.message || "Registration failed";
    toast.error("Registration failed: " + errorMsg);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (defaultStore.isLogged) {
    router.push("/");
  }
});
</script>
