import React from "react";
import { motion } from "framer-motion";
import {
  School,
  Church,
  Users,
  MonitorCheck,
  Dumbbell,
  Gamepad2,
} from "lucide-react";

const facilities = [
  {
    title: "School Bus",
    image: "/images/bus.jpeg",
    icon: <School className="w-6 h-6 text-indigo-600" />,
    description:
      "Safe and reliable transportation to and from school, ensuring student comfort and punctuality.",
  },
  {
    title: "Temple",
    image: "/images/temple.jpeg",
    icon: <Church className="w-6 h-6 text-pink-500" />,
    description:
      "A peaceful spiritual center on campus to foster inner growth and reflection among students.",
  },
  {
    title: "Assembly Area",
    image: "/images/Assembly.jpeg",
    icon: <Users className="w-6 h-6 text-yellow-500" />,
    description:
      "A spacious ground where students gather for announcements, celebrations, and community events.",
  },
  {
    title: "Computer Labs",
    image: "/images/computer labs.jpeg",
    icon: <MonitorCheck className="w-6 h-6 text-blue-500" />,
    description:
      "State-of-the-art labs with modern equipment for hands-on tech education and digital learning.",
  },
  {
    title: "Exercise Area",
    image: "/images/exercise.jpeg",
    icon: <Dumbbell className="w-6 h-6 text-green-600" />,
    description:
      "A designated zone to encourage fitness, movement, and physical development for all ages.",
  },
  {
    title: "Playing Area",
    image: "/images/playing area2.jpeg",
    icon: <Gamepad2 className="w-6 h-6 text-purple-500" />,
    description:
      "Fun and engaging playgrounds designed to nurture imagination, play, and teamwork.",
  },
];

const Facilities = () => {
  return (
    <section className="relative py-16 px-4 sm:px-8 lg:px-16 overflow-hidden bg-white">
      {/* Floating background circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="circle one" />
        <div className="circle two" />
        <div className="circle three" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-bold italic tracking-wide text-center text-blue-600 mb-4 drop-shadow-md">
  Our Facilities
</h2>
        <p className="text-center text-gray-500 text-lg mb-12">
          Explore the different areas that support learning, play, and growth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden border border-gray-200 shadow hover:shadow-lg transition duration-300 bg-white"
            >
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {facility.icon}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {facility.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {facility.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating circles animation */}
      <style>{`
        .circle {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
          animation: floatCircle 40s ease-in-out infinite alternate;
        }

        .circle.one {
          top: 10%;
          left: -15%;
          animation-delay: 0s;
        }

        .circle.two {
          bottom: 15%;
          right: -10%;
          animation-delay: 4s;
        }

        .circle.three {
          top: 40%;
          left: 35%;
          animation-delay: 8s;
        }

        @keyframes floatCircle {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
          100% { transform: translate(-30px, 20px) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default Facilities;
