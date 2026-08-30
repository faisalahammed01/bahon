import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiossecure from "../../Hooks/useAxiossecure";
import riderImg from "../../assets/BeARider.png";

const BeARider = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiossecure();
  const serviceCenters = useLoaderData();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Get unique regions
  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  const selectedRegion = watch("region");

  // Get districts based on selected region
  const districtsByRegion = (region) => {
    if (!region) return [];

    return [
      ...new Set(
        serviceCenters
          .filter((c) => c.region === region)
          .map((d) => d.district)
      ),
    ];
  };

  // Submit rider application
  const handleBeARider = async (data) => {
    try {
      const riderData = {
        ...data,
        email: user?.email,
        status: "pending",
        createdAt: new Date(),
      };

      const response = await axiosSecure.post("/riders", riderData);

      if (response.data.insertedId) {
        await Swal.fire({
          title: "Application Submitted!",
          text: "We will review your application and contact you soon.",
          icon: "success",
          confirmButtonColor: "#2563EB",
        });

        reset();
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting rider application:", error);

      Swal.fire({
        title: "Something went wrong",
        text: "Please try again later.",
        icon: "error",
        confirmButtonColor: "#2563EB",
      });
    }
  };

  return (
    <div className="bg-slate-50">
      {/* ================= MAIN CONTENT ================= */}
      <main className="px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">

            {/* ================= LEFT SIDE - FORM ================= */}
            <div className="p-6 md:p-10 lg:p-12">

              {/* Header */}
              <div className="mb-7">
                <span className="inline-block px-4 py-1.5 mb-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                  Join Our Rider Team
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                  Be a <span className="text-blue-600">Rider</span>
                </h2>

                <p className="text-slate-500 leading-relaxed">
                  Join GOParcel and become a trusted delivery partner. Enjoy
                  flexible work, reliable earnings, and a simple delivery
                  experience.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-200 mb-7"></div>

              <h3 className="text-xl font-semibold text-slate-800 mb-5">
                Tell us about yourself
              </h3>

              {/* ================= FORM ================= */}
              <form
                onSubmit={handleSubmit(handleBeARider)}
                className="space-y-5"
              >
                {/* Name */}
                <fieldset>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name
                  </label>

                  <input
                    type="text"
                    defaultValue={user?.displayName || ""}
                    readOnly={!!user?.displayName}
                    className="input input-bordered w-full bg-slate-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Your Name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </fieldset>

                {/* Driving License */}
                <fieldset>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Driving License Number
                  </label>

                  <input
                    type="text"
                    className="input input-bordered w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Driving License Number"
                    {...register("licenseNumber", {
                      required: "License number is required",
                    })}
                  />

                  {errors.licenseNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.licenseNumber.message}
                    </p>
                  )}
                </fieldset>

                {/* Email */}
                <fieldset>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Email
                  </label>

                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-slate-50 text-slate-500 focus:outline-none"
                    placeholder="Your Email"
                    {...register("email")}
                  />
                </fieldset>

                {/* Region */}
                <fieldset>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Region
                  </label>

                  <select
                    className="select select-bordered w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    defaultValue=""
                    {...register("region", {
                      required: "Region is required",
                    })}
                  >
                    <option value="" disabled>
                      Select your Region
                    </option>

                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>

                  {errors.region && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.region.message}
                    </p>
                  )}
                </fieldset>

                {/* District */}
                <fieldset>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your District
                  </label>

                  <select
                    className="select select-bordered w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    defaultValue=""
                    {...register("district", {
                      required: "District is required",
                    })}
                  >
                    <option value="" disabled>
                      Select your District
                    </option>

                    {districtsByRegion(selectedRegion).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>

                  {errors.district && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.district.message}
                    </p>
                  )}
                </fieldset>

                {/* NID */}
                <fieldset>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    NID Number
                  </label>

                  <input
                    type="text"
                    className="input input-bordered w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="NID Number"
                    {...register("nid", {
                      required: "NID is required",
                    })}
                  />

                  {errors.nid && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nid.message}
                    </p>
                  )}
                </fieldset>

                {/* Phone */}
                <fieldset>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    className="input input-bordered w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Phone Number"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                  />

                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </fieldset>

                {/* Bike Model */}
                <fieldset>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bike Brand, Model & Year
                  </label>

                  <input
                    type="text"
                    className="input input-bordered w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Honda Shine 125 - 2024"
                    {...register("bikeModel", {
                      required: "Bike model is required",
                    })}
                  />

                  {errors.bikeModel && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bikeModel.message}
                    </p>
                  )}
                </fieldset>

                {/* Bike Registration */}
                <fieldset>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bike Registration Number
                  </label>

                  <input
                    type="text"
                    className="input input-bordered w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Dhaka Metro-LA-123456"
                    {...register("bikeRegNumber", {
                      required: "Bike registration number is required",
                    })}
                  />

                  {errors.bikeRegNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bikeRegNumber.message}
                    </p>
                  )}
                </fieldset>

                {/* About */}
                <fieldset>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tell Us About Yourself
                  </label>

                  <textarea
                    className="textarea textarea-bordered w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Tell us about yourself..."
                    rows={4}
                    {...register("about")}
                  />
                </fieldset>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn w-full bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Submit Application
                </button>
              </form>
            </div>

            {/* ================= RIGHT SIDE - IMAGE ================= */}
            <div className="hidden md:block bg-gradient-to-br from-blue-50 to-white">
              <div className="h-full flex flex-col items-center justify-start px-8 pt-16">

                {/* Badge */}
                <span className="px-5 py-2 rounded-full bg-white border border-blue-100 shadow-sm text-blue-600 font-semibold text-sm mb-8">
                  🚴 Delivery Partner
                </span>

                {/* Rider Image */}
                <img
                  src={riderImg}
                  alt="Be a Rider"
                  className="w-full max-w-md object-contain"
                />

                {/* Text */}
                <div className="text-center mt-5 max-w-md pb-10">
                  <h3 className="text-2xl font-bold text-slate-800">
                    Deliver with{" "}
                    <span className="text-blue-600">GOParcel</span>
                  </h3>

                  <p className="text-slate-500 mt-2 leading-relaxed">
                    Be part of our growing delivery network and help people
                    receive their parcels faster.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BeARider;