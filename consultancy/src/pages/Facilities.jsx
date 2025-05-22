import React from "react";
import Tilt from "react-parallax-tilt";
import {
  School,
  BookOpenCheck,
  Palette,
  Church,
  Users,
  MonitorCheck,
  Dumbbell,
  Gamepad2,
} from "lucide-react";

// Facility Data
const facilities = [
  {
    title: "School Bus",
    image: "/images/bus.jpeg",
    icon: <School className="w-6 h-6" />,
    description:
      "Safe and reliable transportation to and from school, ensuring student comfort and punctuality.",
  },

 {
  title: "Classrooms",
  image: "/images/classroom 2.jpeg",
  icon: <BookOpenCheck className="w-6 h-6" />,
  description:
   "Comfortable and well-structured classrooms that support effective teaching and attentive learning in a calm setting.",
},

{
  title: "Vibrant Environment",
  image: "/images/backToSchool.jpeg",
  icon: <Palette  className="w-6 h-6" />,
  description:
    "A colorful, cheerful, and dynamic campus that fosters creativity, positivity, and holistic student development.",
},

  {
    title: "Temple",
    image: "/images/temple.jpeg",
    icon: <Church className="w-6 h-6" />,
    description:
      "A peaceful spiritual center on campus to foster inner growth and reflection among students.",
  },
  {
    title: "Assembly Area",
    image: "/images/Assembly.jpeg",
    icon: <Users className="w-6 h-6" />,
    description:
      "A spacious ground where students gather for announcements, celebrations, and community events.",
  },
  {
    title: "Computer Labs",
    image: "/images/computer labs.jpeg",
    icon: <MonitorCheck className="w-6 h-6" />,
    description:
      "State-of-the-art labs with modern equipment for hands-on tech education and digital learning.",
  },
  {
    title: "Exercise Area",
    image: "/images/exercise.jpeg",
    icon: <Dumbbell className="w-6 h-6" />,
    description:
      "A designated zone to encourage fitness, movement, and physical development for all ages.",
  },
  {
    title: "Playing Area",
    image: "/images/playing area2.jpeg",
    icon: <Gamepad2 className="w-6 h-6" />,
    description:
      "Fun and engaging playgrounds designed to nurture imagination, play, and teamwork.",
  },
];

// Class Intake Data
const classIntake = [
  { className: "Pre-KG", count: 40 },
  { className: "LKG", count: 120 },
  { className: "UKG", count: 120 },
  { className: "I", count: 120 },
  { className: "II", count: 120 },
  { className: "III", count: 140 },
  { className: "IV", count: 140 },
  { className: "V", count: 140 },
  { className: "VI", count: 140 },
  { className: "VII", count: 140 },
  { className: "VIII", count: 140 },
  { className: "IX", count: 175 },
  { className: "X", count: 175 },
  { className: "XI", count: 175 },
  { className: "XII", count: 175 },
];

const Facilities = () => {
  return (
    <section className="py-20 px-6 bg-white min-h-screen">
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-indigo-700 mb-10">
        Facilities
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
        A modern environment designed for comfort, learning, and fun.
      </p>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-24">
        {facilities.map((facility, index) => (
          <Tilt
            key={index}
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.05}
            transitionSpeed={1000}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            className="rounded-2xl shadow-xl"
          >
            <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-indigo-300 transition-all duration-300">
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 shadow">
                    {facility.icon}
                  </div>
                  <h3 className="text-lg font-bold text-indigo-800">
                    {facility.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  {facility.description}
                </p>
              </div>
            </div>
          </Tilt>
        ))}
      </div>

      {/* Class Intake Section */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-extrabold text-center text-indigo-700 mb-10">
          Class Intake Capacity
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {classIntake.map(({ className, count }, i) => {
            const maxCount = 175;
            const percent = (count / maxCount) * 100;
            const colors = [
              "bg-indigo-500",
              "bg-pink-500",
              "bg-green-500",
              "bg-purple-500",
              "bg-yellow-500",
            ];
            const color = colors[i % colors.length];

            return (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {className}
                </h4>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
                  <div
                    className={`${color} h-4 rounded-full transition-all duration-700`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-sm text-right text-gray-600 font-bold">
                  {count} Students
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
