<template>
  <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <h1 class="text-2xl font-bold mb-4">Question List</h1>
    <table class="table-auto w-full border border-gray-300 dark:border-gray-600 border-collapse text-gray-900 dark:text-gray-100">
      <thead class="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th class="border border-gray-300 dark:border-gray-600 px-4 py-2">ID</th>
          <th class="border border-gray-300 dark:border-gray-600 px-4 py-2">Type</th>
          <th class="border border-gray-300 dark:border-gray-600 px-4 py-2">Level</th>
          <th class="border border-gray-300 dark:border-gray-600 px-4 py-2">Question</th>
          <th class="border border-gray-300 dark:border-gray-600 px-4 py-2">Reflection</th>
          <th class="border border-gray-300 dark:border-gray-600 px-4 py-2">Create User</th>
          <th class="border border-gray-300 dark:border-gray-600 px-4 py-2">Create Date</th>
          <th class="border border-gray-300 dark:border-gray-600 px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="q in questions" :key="q.question_id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
          <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">{{ q.question_id }}</td>
          <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">{{ q.question_type }}</td>
          <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">{{ q.question_level }}</td>
          <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">{{ q.questions }}</td>
          <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">{{ q.reflection_prompt }}</td>
          <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">{{ q.create_user }}</td>
          <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">{{ new Date(q.create_date).toLocaleString() }}</td>
          <td class="border border-gray-300 dark:border-gray-600 px-4 py-2">
            <router-link
              :to="`/questionanswer?questionId=${q.question_id}`"
              class="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
            >
              作答
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import { getQuestions } from "@/utils/api";

export default {
  name: 'QuestionList',
  data() {
    return {
      questions: []
    };
  },
  async mounted() {
    try {
      this.questions = await getQuestions();
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  }
};
</script>