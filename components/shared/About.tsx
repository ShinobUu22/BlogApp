import React from "react";

const About = () => {
  return (
    <div className="">
      <main className="bg-white shadow-lg rounded-xl lg:p-8 pb-12 mb-8">
        <h1 className="text-3xl font-bold mb-4">About this Project</h1>
        <p className="text-lg leading-relaxed text-gray-700">
          This blog website is built using the latest web technologies to
          deliver a seamless and dynamic user experience. The project leverages
          <strong className="text-indigo-600"> Next.js</strong> for
          server-rendered React applications, ensuring fast page loads and
          excellent SEO performance.
        </p>
        <p className="text-lg leading-relaxed text-gray-700 mt-4">
          <strong className="text-indigo-600">TailwindCSS</strong> is utilized
          for styling, providing a highly customizable and responsive design
          that looks great on all devices. User authentication and management
          are handled by <strong className="text-indigo-600">Clerk</strong>,
          offering secure and efficient user experiences.
        </p>
        <p className="text-lg leading-relaxed text-gray-700 mt-4">
          For the backend, the project uses{" "}
          <strong className="text-indigo-600">Convex</strong> to manage data
          interactions, and{" "}
          <strong className="text-indigo-600">Firebase</strong> for additional
          features like hosting and real-time database functionalities.
        </p>
        <p className="text-lg leading-relaxed text-gray-700 mt-4">
          <strong className="text-indigo-600">TypeScript</strong> is employed to
          ensure type safety across the project, enhancing code quality and
          reducing the likelihood of bugs.
        </p>
        <p className="text-lg leading-relaxed text-gray-700 mt-4">
          This project reflects a commitment to modern development practices and
          aims to provide an engaging platform for users to share and discover
          content.
        </p>
      </main>
      <footer className="border-t-2 border-b-2 bg-white shadow-lg lg:p-8 pb-12 mb-8 flex justify-between w-full text-lg rounded-xl">
        <span className="text-slate-900 font-semibold">
          All Rights Reserved.
        </span>
        <span className="text-slate-900 font-semibold">
          Powered by: Avash & Saphin
        </span>
      </footer>
    </div>
  );
};

export default About;
