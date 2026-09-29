import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { adminLogin } from "../api";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      setErrorMessage("");
      try {
        await adminLogin(values.email, values.password);
        navigate("/admin/messages");
      } catch (error) {
        setErrorMessage(
          error.message || "Login failed, please check your credentials"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-md mx-auto">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-6 sm:mb-8">
          Admin <span className="text-green-600">Login</span>
        </h1>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-200 text-red-800 text-xs sm:text-sm font-medium transition-all">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 space-y-4 sm:space-y-5"
        >

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-3.5 py-2.5 sm:py-3 text-sm outline-none transition ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600"
              }`}
            />

            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full border rounded-lg pl-3.5 pr-10 py-2.5 sm:py-3 text-sm outline-none transition ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium text-sm sm:text-base disabled:bg-gray-400 cursor-pointer shadow-sm mt-2"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default Login;