<template>
  <div class="p-4 bg-gray-100 flex justify-between">
    <div class="text-lg">ChatGPT Vue</div>
    <n-button @click="login">登入</n-button>
    <n-button @click="register">註冊</n-button>
    <n-button @click="logout">登出</n-button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { removeToken } from "@/utils/api";

const router = useRouter();

const login = () => {
  removeToken();
  router.push("/login");
};

const register = () => {
  removeToken();
  router.push("/register");
};

const logout = () => {
  removeToken();
  router.push("/login");
};
</script>