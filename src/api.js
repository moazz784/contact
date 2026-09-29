// src/api.js

const BASE_URL = "http://localhost:5000/api";

// ==========================================
// 1) APIs الخاصة بالعميل (Public)
// ==========================================

/**
 * إرسال رسالة من فورم التواصل
 * @param {Object} formData - البيانات (name, email, phone, subject, message, website)
 */
export const sendContactMessage = async (formData) => {
  const response = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "حدث خطأ أثناء إرسال الرسالة");
  }

  return data;
};

// ==========================================
// 2) APIs الخاصة بالأدمن (Admin Authentication)
// ==========================================

/**
 * تسجيل دخول الأدمن
 * @param {string} email 
 * @param {string} password 
 */
export const adminLogin = async (email, password) => {
  const response = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "بيانات الدخول غير صحيحة");
  }

  // حفظ التوكن تلقائياً عند النجاح
  if (data.token) {
    localStorage.setItem("adminToken", data.token);
  }

  return data;
};

// ==========================================
// 3) APIs إدارة الرسائل للأدمن (Protected Routes)
// ==========================================

// دالة مساعدة لجلب التوكن وإضافته في الـ Header
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

// دالة مساعدة لمعالجة ردود أخطاء الـ API
const handleAuthError = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem("adminToken"); // مسح التوكن لو انتهى
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "حدث خطأ أثناء الاتصال بالخادم");
  }
};

/**
 * جلب قائمة الرسائل للأدمن
 * @param {number} page - رقم الصفحة
 * @param {number} limit - عدد الرسائل في الصفحة
 * @param {boolean} unreadOnly - عرض غير المقروء فقط (اختياري)
 */
export const getAdminMessages = async (page = 1, limit = 20, unreadOnly = false) => {
  let url = `${BASE_URL}/admin/messages?page=${page}&limit=${limit}`;
  if (unreadOnly) url += `&unread=true`;

  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  await handleAuthError(response);

  return await response.json();
};

/**
 * قراءة تفاصيل رسالة واحدة بناءً على الـ ID
 * @param {number|string} id 
 */
export const getAdminMessageById = async (id) => {
  const response = await fetch(`${BASE_URL}/admin/messages/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  await handleAuthError(response);

  return await response.json();
};

/**
 * تغيير حالة القراءة لرسالة (مقروءة / غير مقروءة)
 * @param {number|string} id 
 * @param {boolean} isRead 
 */
export const toggleMessageReadStatus = async (id, isRead) => {
  const response = await fetch(`${BASE_URL}/admin/messages/${id}/read`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ isRead }),
  });

  await handleAuthError(response);

  return await response.json();
};

/**
 * حذف رسالة
 * @param {number|string} id 
 */
export const deleteAdminMessage = async (id) => {
  const response = await fetch(`${BASE_URL}/admin/messages/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  await handleAuthError(response);

  return await response.json();
};