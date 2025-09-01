<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6 text-center">註冊帳號</h2>

      <n-form>
        <n-form-item label="帳號">
          <n-input v-model:value="username" placeholder="請輸入使用者名稱" clearable />
        </n-form-item>

        <n-form-item label="密碼">
          <n-input
            v-model:value="password"
            placeholder="請輸入密碼"
            type="password"
            show-password-on="click"
            clearable
          />
        </n-form-item>

        <n-form-item label="註冊身分">
          <n-select
            v-model:value="role"
            :options="[
              { label: '老師', value: 1 },
              { label: '學生', value: 2 }
            ]"
            placeholder="請選擇註冊類型"
          />
        </n-form-item>

        <n-button type="primary" block :loading="loading" @click="handleRegister">
          註冊
        </n-button>
      </n-form>

      <n-alert v-if="errorMessage" type="error" class="mt-4">
        {{ errorMessage }}
      </n-alert>

      <n-alert v-if="successMessage" type="success" class="mt-4">
        {{ successMessage }}
      </n-alert>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/utils/api";

const username = ref("");
const password = ref("");
const role = ref(null); // 1 老師，2 學生

const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter();

const handleRegister = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  loading.value = true;

  if (!username.value || !password.value || !role.value) {
    errorMessage.value = "請填寫所有欄位";
    loading.value = false;
    return;
  }

  try {
    const res = await register({
      username: username.value,
      password: password.value,
      role: role.value,
    });

    console.log("後端回傳：", res);

    if (res.message && res.message.toLowerCase().includes("success")) {
      successMessage.value = "註冊成功！即將跳轉...";
      setTimeout(() => router.push("/login"), 1500);
    } else {
      errorMessage.value = res.error || res.message || "註冊失敗";
    }
  } catch (err) {
    errorMessage.value = "伺服器錯誤，請稍後再試";
  } finally {
    loading.value = false;
  }
};
</script>