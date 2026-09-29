import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { getAdminMessages } from "../api";

function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval;
    let isMounted = true; // للتأكد من عدم تحديث الـ State بعد مغادرة المكون (Memory Leak Prevention)

    const fetchCount = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      try {
        const result = await getAdminMessages(1, 1);

        if (isMounted && result && typeof result.unreadCount === "number") {
          setCount(result.unreadCount);
        }
      } catch (error) {
        if (error.message === "UNAUTHORIZED" && isMounted) {
          clearInterval(interval);
        }
      }
    };

    fetchCount();

    // تحديث الإشعارات كل 10 ثوانٍ
    interval = setInterval(fetchCount, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const token = localStorage.getItem("adminToken");
  if (!token) return null;

  return (
    <Link
      to="/admin/messages"
      className="relative p-2 text-gray-700 hover:text-green-600 transition flex items-center justify-center rounded-full hover:bg-gray-100"
      title="Messages Notifications"
    >
      <Bell className="w-5 h-5 sm:w-6 sm:h-6" />

      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-[20px] px-1 rounded-full flex items-center justify-center animate-pulse shadow-sm">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

export default NotificationBell;