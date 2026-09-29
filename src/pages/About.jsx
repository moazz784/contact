function About() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          About <span className="text-green-600">Us</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed sm:leading-8 max-w-2xl mx-auto">
          We are building a simple and modern website that provides
          users with an easy and friendly experience.
        </p>

        {/* Optional Cards / Grid Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast</h3>
            <p className="text-sm text-gray-500">Optimized for high performance and responsiveness.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Simple</h3>
            <p className="text-sm text-gray-500">Clean user interface designed for seamless navigation.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure</h3>
            <p className="text-sm text-gray-500">Built with modern tools to ensure reliability and safety.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;