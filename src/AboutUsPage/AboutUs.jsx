const AboutUs = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Header Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-green-800 mb-4">About Our Library</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Dedicated to fostering knowledge and community through access to books and resources, we strive to empower every learner.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To provide an inclusive, welcoming environment that supports education, creativity, and lifelong learning by offering access to diverse resources and technology.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To be a leading community library recognized for innovation, accessibility, and a passion for enriching lives through knowledge.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Our Core Values</h2>
        <div className="grid sm:grid-cols-3 gap-10 text-center">
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Integrity</h3>
            <p className="text-gray-600">
              We operate with honesty and transparency, ensuring trust with our community.
            </p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Inclusivity</h3>
            <p className="text-gray-600">
              We welcome everyone and provide resources that reflect diverse voices and experiences.
            </p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Innovation</h3>
            <p className="text-gray-600">
              We embrace technology and creative solutions to enhance learning.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Meet Our Team</h2>
        <div className="grid sm:grid-cols-3 gap-10">
          {/* Team Member Card */}
          <div className="text-center p-6 border rounded shadow hover:shadow-lg transition">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="John Doe"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-1">John Doe</h3>
            <p className="text-green-700 font-medium mb-2">Library Director</p>
            <p className="text-gray-600 text-sm">
              Passionate about making knowledge accessible for everyone.
            </p>
          </div>

          <div className="text-center p-6 border rounded shadow hover:shadow-lg transition">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Jane Smith"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-1">Jane Smith</h3>
            <p className="text-green-700 font-medium mb-2">Community Outreach Coordinator</p>
            <p className="text-gray-600 text-sm">
              Building partnerships and programs that connect our library with the community.
            </p>
          </div>

          <div className="text-center p-6 border rounded shadow hover:shadow-lg transition">
            <img
              src="https://randomuser.me/api/portraits/men/55.jpg"
              alt="Michael Lee"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-1">Michael Lee</h3>
            <p className="text-green-700 font-medium mb-2">Technology Specialist</p>
            <p className="text-gray-600 text-sm">
              Innovating how users access and engage with our digital resources.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
