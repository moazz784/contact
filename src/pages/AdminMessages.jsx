import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getAdminMessages, 
  toggleMessageReadStatus, 
  deleteAdminMessage 
} from "../api"; // ✅
function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadMessages = async () => {
    try {
      // جلب الرسائل (الرد يحتوي على items)
      const result = await getAdminMessages(1);
      setMessages(result.items || []);
    } catch (error) {
      console.error(error);
      if (error.message === "UNAUTHORIZED") {
        alert("Session expired, please login again");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // تغيير حالة القراءة
  const handleMarkAsRead = async (id, currentReadStatus) => {
    try {
      await toggleMessageReadStatus(id, !currentReadStatus);
      loadMessages(); // إعادة تحميل القائمة بعد التحديث
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  // حذف الرسالة
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await deleteAdminMessage(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Failed to delete message", error);
      alert("Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-600 font-medium">Loading messages...</p>
      </div>
    );
  }

  return (
    <section className="min-h-[80vh] bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Messages Dashboard
        </h1>

        {messages.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <p className="text-gray-500">No messages found.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`bg-white p-6 rounded-xl shadow transition ${
                  !message.isRead
                    ? "border-l-4 border-green-600 bg-green-50/20"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {message.name}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {message.email} {message.phone && `• ${message.phone}`}
                    </p>

                    {message.subject && (
                      <p className="text-gray-800 font-medium text-sm mt-1">
                        <span className="text-gray-400">Subject:</span> {message.subject}
                      </p>
                    )}
                  </div>

                  {!message.isRead && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      New
                    </span>
                  )}
                </div>

                {/* طباعة الرسالة كنص عادي لحمايتها (textContent) */}
                <p className="text-gray-700 mt-4 whitespace-pre-wrap leading-relaxed">
                  {message.message}
                </p>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleMarkAsRead(message.id, message.isRead)}
                      className={`px-4 py-2 text-sm rounded-lg transition cursor-pointer ${
                        !message.isRead
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {!message.isRead ? "Mark as Read" : "Mark as Unread"}
                    </button>

                    <button
                      onClick={() => handleDelete(message.id)}
                      className="bg-red-50 text-red-600 px-4 py-2 text-sm rounded-lg hover:bg-red-100 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default AdminMessages;