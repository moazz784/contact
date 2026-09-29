import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendContactMessage } from "../api";

function Contact() {
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      website: "", // Honeypot Field
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),

      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),

      phone: Yup.string().nullable(),

      subject: Yup.string().nullable(),

      message: Yup.string()
        .min(5, "Message must be at least 5 characters")
        .required("Message is required"),
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setStatusMessage({ type: "", text: "" });
      try {
        const response = await sendContactMessage(values);

        setStatusMessage({
          type: "success",
          text: response.message || "Message sent successfully!",
        });

        resetForm();
      } catch (error) {
        setStatusMessage({
          type: "error",
          text: error.message || "Failed to send message",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-2">
          Contact <span className="text-green-600">Us</span>
        </h1>

        <p className="text-center text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
          Send us a message and we will get back to you.
        </p>

        {/* Alert Feedback Messages */}
        {statusMessage.text && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium transition-all ${
              statusMessage.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-5 sm:p-8 rounded-xl shadow-sm border border-gray-100 space-y-4 sm:space-y-5"
        >

          {/* Name & Email Group (Grid on Medium Screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full border rounded-lg px-3.5 py-2.5 sm:py-3 text-sm outline-none transition ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600"
                }`}
              />

              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Email *
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
          </div>

          {/* Phone & Subject Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Phone (Optional)
              </label>

              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 sm:py-3 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Subject (Optional)
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 sm:py-3 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition"
              />
            </div>
          </div>

          {/* Honeypot Field */}
          <input
            type="text"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Message *
            </label>

            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Write your message..."
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-3.5 py-2.5 sm:py-3 text-sm outline-none resize-none transition ${
                formik.touched.message && formik.errors.message
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600"
              }`}
            />

            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium text-sm sm:text-base disabled:bg-gray-400 cursor-pointer shadow-sm"
          >
            {formik.isSubmitting ? "Sending..." : "Send Message"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default Contact;