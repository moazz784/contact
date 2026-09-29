function Home() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-3xl">

        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to MyWebsite
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          A simple and modern landing page built with React and Tailwind CSS.
        </p>

        <a
          href="/contact"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Contact Us
        </a>

      </div>
    </section>
  );
}

export default Home;