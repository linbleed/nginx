<template>
  <n-card style="max-width: 600px; margin: 20px auto;">
    <h2 v-if="step === 1">題目</h2>
    <h2 v-if="step === 2">評分結果</h2>
    <h2 v-if="step === 3">回響</h2>

    <div v-if="step === 1">
      <p>{{ question }}</p>
      <n-input
        v-model:value="userAnswer"
        type="textarea"
        placeholder="請輸入你的答案"
        rows="5"
      />
      <n-button type="primary" @click="submitAnswer" :loading="loading">送出答案</n-button>
    </div>

    <div v-if="step === 2">
      <p><strong>分數：</strong>{{ score }}</p>
      <p><strong>回饋：</strong>{{ feedback }}</p>
      <n-button type="primary" @click="goToReflection">進入回響</n-button>
    </div>

    <div v-if="step === 3">
      <p>{{ reflectionPrompt }}</p>
      <n-input
        v-model:value="reflectionAnswer"
        type="textarea"
        placeholder="請輸入你的回響"
        rows="5"
      />
      <n-button type="primary" @click="submitReflection" :loading="loading">送出回響</n-button>
    </div>
  </n-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMe, checkAnswerExists, getQuestion, checkAnswer, sendReflection } from "@/utils/api";
import { useRouter } from "vue-router";

const questionId = new URLSearchParams(window.location.search).get("questionId");

const username = ref("");
const question = ref("");
const userAnswer = ref("");
const score = ref(null);
const feedback = ref("");
const reflectionPrompt = ref("請針對這次的題目與你的答案進行自我反思。");
const reflectionAnswer = ref("");

const step = ref(1);
const loading = ref(false);
const router = useRouter();

onMounted(async () => {
  try {
    // 取得登入使用者帳號
    const meRes = await getMe();
    username.value = meRes.username;  // 不要用 meRes.data.username

    // 先檢查是否已回答過
    const data1 = await checkAnswerExists(questionId, username.value);
    console.log("API 回傳完整資料:", data1); // { answered: true/false }
    const { answered } = data1;
    console.log("answered 值:", answered);
    if (answered) {
      console.log("這題已經回答過，跳轉回 question list");
      alert("你已經回答過這題了，將回到題目列表");
      router.push("/questionlist");
      return;
    } else {
      console.log("這題尚未回答，可以作答");
    }

    const data = await getQuestion(questionId);
    question.value = data.questions;  // 你 API 回傳的是 "questions" 還是 "question"？
    reflectionPrompt.value = data.reflection_prompt;
  } catch (error) {
    console.error("checkAnswerExists 發生錯誤:", error);
    alert("頁面載入失敗：" + error.message);
  }
});

async function submitAnswer() {
  loading.value = true;
  try {
    const res = await checkAnswer(questionId, {
    username: username.value,
    answer: userAnswer.value});
    score.value = res.score;
    feedback.value = res.feedback;
    step.value = 2;
  } catch (e) {
    alert("送出答案失敗");
  } finally {
    loading.value = false;
  }
}

function goToReflection() {
  step.value = 3;
}

async function submitReflection() {
  loading.value = true;
  try {
    await sendReflection(questionId, {
    username: username.value,
    reflection: reflectionAnswer.value});
    alert("已完成作答，將回到題目列表");
    router.push("/questionlist");
    step.value = 1;
    userAnswer.value = "";
    reflectionAnswer.value = "";
  } catch (e) {
    alert("送出回響失敗");
  } finally {
    loading.value = false;
  }
}
</script>