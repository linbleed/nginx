<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">會員登入</h2>

      <!-- 使用者名稱 -->
      <n-form-item
        label="使用者名稱"
        :feedback="usernameError"
        :feedback-type="usernameError ? 'error' : undefined"
        show-feedback
      >
        <n-input v-model:value="username" placeholder="請輸入使用者名稱" />
      </n-form-item>

      <!-- 密碼 -->
      <n-form-item
        label="密碼"
        :feedback="passwordError"
        :feedback-type="passwordError ? 'error' : undefined"
        show-feedback
      >
        <n-input v-model:value="password" type="password" placeholder="請輸入密碼" />
      </n-form-item>

      <!-- 登入按鈕 -->
      <n-button
        type="primary"
        block
        :loading="loading"
        class="mt-6"
        @click="handleLogin"
      >
        登入
      </n-button>

      <!-- 錯誤訊息 -->
      <p v-if="errorMsg" class="mt-4 text-center text-red-600">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login, setToken } from "@/utils/api";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const errorMsg = ref("");
const loading = ref(false);
const usernameError = ref("");
const passwordError = ref("");
const router = useRouter();

// 表單驗證
const validate = () => {
  usernameError.value = "";
  passwordError.value = "";
  errorMsg.value = "";
  let valid = true;

  if (!username.value.trim()) {
    usernameError.value = "使用者名稱不可為空";
    valid = false;
  }
  if (!password.value) {
    passwordError.value = "密碼不可為空";
    valid = false;
  }

  return valid;
};

// 登入處理
const handleLogin = async () => {
  console.log("🔑 handleLogin 被呼叫了");
  if (!validate()) return;

  loading.value = true;
  try {
    const res = await login({
      username: username.value,
      password: password.value,
    });

    console.log("✅ API 回傳資料：", res);

    if (res.access_token) {
      setToken(res.access_token);

      if (res.role === 1) {
        router.push("/chat"); // 老師導向
      } else if (res.role === 2) {
        router.push("/questionlist"); // 學生導向
      } else {
        errorMsg.value = "未知角色，請聯絡管理員";
      }
    } else {
      errorMsg.value = "登入失敗，請檢查帳號密碼";
    }
  } catch (err) {
    console.error("❌ 登入錯誤：", err);
    errorMsg.value = "伺服器錯誤，請稍後再試";
  } finally {
    loading.value = false;
  }
};
</script>