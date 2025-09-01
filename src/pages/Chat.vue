<template>
  <div class="p-4 max-w-2xl mx-auto">
    <div v-for="msg in messages" :key="msg.id" class="mb-2">
      <div><strong>你：</strong>{{ msg.question }}</div>
      <div><strong>GPT：</strong>{{ msg.answer }}</div>
    </div>
    <n-input v-model:value="input" placeholder="輸入訊息" class="my-4" />
    <n-button @click="handleSend">送出</n-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { sendMessage } from "@/utils/api";

const input = ref("");
const messages = ref([]);

const handleSend = async () => {
  if (!input.value) return;
  const res = await sendMessage(input.value);
  messages.value.push({
    question: input.value,
    answer: res.answer || "無回應",
    id: Date.now()
  });
  input.value = "";
};
</script>