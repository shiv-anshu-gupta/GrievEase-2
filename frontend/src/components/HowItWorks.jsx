// src/components/HowItWorks.jsx
import { CheckCircle, FileText, UserCheck, Send } from "lucide-react";

const steps = [
  {
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    title: "Submit Complaint",
    description:
      "Easily report civic issues in your locality with photos, details, and location.",
  },
  {
    icon: <UserCheck className="h-8 w-8 text-blue-600" />,
    title: "Verified & Assigned",
    description:
      "Complaints are verified and forwarded to the relevant municipal officer.",
  },
  {
    icon: <Send className="h-8 w-8 text-blue-600" />,
    title: "Track Progress",
    description:
      "Check live status updates and messages from the assigned officer.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
    title: "Get Resolution",
    description: "Receive resolution notice once your complaint is addressed.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
