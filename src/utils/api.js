const BASE_URL = "https://fastapi-chatgpt-production.up.railway.app";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export async function login(payload) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function register(payload) {
  console.log("POST to", BASE_URL + "/register");
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function sendMessage(message) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ message }),
  });
  return res.json();
}

export async function getMe() {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user info: ${res.status}`);
  }

  return res.json(); // 回傳格式應該是 { username: "eddie", ... }
}

export async function getQuestions() {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/questionlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch questions: ${res.status}`);
  }

  return res.json();
}

// 取得單一題目
export async function getQuestion(questionId) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/question/${questionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch question: ${res.status}`);
  }

  return res.json();
}

// 檢查答案
export async function checkAnswer(questionId, answer) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/check/${questionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify( answer ) // 把使用者回答傳給後端
  });

  if (!res.ok) {
    throw new Error(`Failed to check answer: ${res.status}`);
  }

  return res.json(); // 後端應該回傳 { score: 85, feedback: "你的文法有些小錯..." }
}

// 送出迴響
export async function sendReflection(questionId, reflection) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/reflection/${questionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify( reflection ) // 把使用者回答傳給後端
  });

  if (!res.ok) {
    throw new Error(`Failed to check reflection: ${res.status}`);
  }

  return res.json(); 
}

// 取得使用者對某題是否已回答
export async function checkAnswerExists(questionId, username) {
  const token = getToken(); // 可選
  const res = await fetch(`${BASE_URL}/checkexists/${encodeURIComponent(questionId)}?username=${encodeURIComponent(username)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }), // 有 token 才加
    },
  });

  if (!res.ok) {
    try {
      const msg = await res.json();
      throw new Error(`Failed to check answer exists (${res.status}): ${msg.detail}`);
    } catch {
      const fallbackMsg = await res.text();
      throw new Error(`Failed to check answer exists (${res.status}): ${fallbackMsg}`);
    }
  }

  return await res.json(); // { answered: true/false }
}