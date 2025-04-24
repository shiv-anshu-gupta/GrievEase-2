import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ToggleRoleSwitcher from "../../components/ToggleRoleSwitcher";
import { registerUser } from "@/api/auth/userConfig";
const RegisterPage = () => {
  const [role, setRole] = useState("citizen");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", role);

    if (data.profilePic?.[0]) {
      formData.append("profilePic", data.profilePic[0]);
    }

    setLoading(true);
    try {
      const result = await registerUser(formData); // ✅ Use your module here
      console.log("Registration success:", result);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register for GrievEase
        </h2>

        <ToggleRoleSwitcher role={role} setRole={setRole} />

        <p className="text-center text-sm mb-4 text-gray-600">
          You’re registering as: <span className="font-medium">{role}</span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Full Name */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Full Name
              </label>
              <input
                {...register("fullName", { required: "Full name is required" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Profile Pic */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Profile Picture (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("profilePic")}
              className="w-full px-2 py-1.5 border rounded-md"
            />
          </div>

          {/* Password & Confirm Password side-by-side */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full relative">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute right-3 top-[38px] text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="w-full relative">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute right-3 top-[38px] text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">
              I agree to the terms and conditions
            </span>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2 rounded-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center text-sm mt-2">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
