import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiossecure from "../../Hooks/useAxiossecure";
import riderImg from "../../assets/brands/moonstar.png"

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

  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  const selectedRegion = watch("region");

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
        Swal.fire({
          title: "Application Submitted!",
          text: "We will review your application and contact you soon.",
          icon: "success",
          confirmButtonColor: "#65ac08",
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
        confirmButtonColor: "#65ac08",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0b3b3c] mb-2">
            Be a Rider
          </h2>

          <p className="text-gray-500 mb-6">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          <hr className="mb-6" />

          <h3 className="text-xl font-semibold text-[#0b3b3c] mb-4">
            Tell us about yourself
          </h3>

          <form
            onSubmit={handleSubmit(handleBeARider)}
            className="space-y-4"
          >
            {/* Name */}
            <fieldset>
              <label className="label">Your Name</label>
              <input
                defaultValue={user?.displayName || ""}
                readOnly={!!user?.displayName}
                className="input input-bordered w-full"
                placeholder="Your Name"
                {...register("name", {
                  required: "Name is required",
                })}
              />

              {errors.name && (
                <p className="text-error text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </fieldset>

            {/* License */}
            <fieldset>
              <label className="label">Driving License Number</label>
              <input
                className="input input-bordered w-full"
                placeholder="Driving License Number"
                {...register("licenseNumber", {
                  required: "License number is required",
                })}
              />

              {errors.licenseNumber && (
                <p className="text-error text-sm mt-1">
                  {errors.licenseNumber.message}
                </p>
              )}
            </fieldset>

            {/* Email */}
            <fieldset>
              <label className="label">Your Email</label>
              <input
                type="email"
                defaultValue={user?.email || ""}
                readOnly
                className="input input-bordered w-full"
                placeholder="Your Email"
                {...register("email")}
              />
            </fieldset>

            {/* Region */}
            <fieldset>
              <label className="label">Your Region</label>

              <select
                className="select select-bordered w-full"
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
                <p className="text-error text-sm mt-1">
                  {errors.region.message}
                </p>
              )}
            </fieldset>

            {/* District */}
            <fieldset>
              <label className="label">Your District</label>

              <select
                className="select select-bordered w-full"
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
                <p className="text-error text-sm mt-1">
                  {errors.district.message}
                </p>
              )}
            </fieldset>

            {/* NID */}
            <fieldset>
              <label className="label">NID No</label>

              <input
                className="input input-bordered w-full"
                placeholder="NID Number"
                {...register("nid", {
                  required: "NID is required",
                })}
              />

              {errors.nid && (
                <p className="text-error text-sm mt-1">
                  {errors.nid.message}
                </p>
              )}
            </fieldset>

            {/* Phone */}
            <fieldset>
              <label className="label">Phone Number</label>

              <input
                type="tel"
                className="input input-bordered w-full"
                placeholder="Phone Number"
                {...register("phone", {
                  required: "Phone number is required",
                })}
              />

              {errors.phone && (
                <p className="text-error text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </fieldset>

            {/* Bike Model */}
            <fieldset>
              <label className="label">Bike Brand Model and Year</label>

              <input
                className="input input-bordered w-full"
                placeholder="Honda Shine 125 - 2024"
                {...register("bikeModel", {
                  required: "Bike model is required",
                })}
              />

              {errors.bikeModel && (
                <p className="text-error text-sm mt-1">
                  {errors.bikeModel.message}
                </p>
              )}
            </fieldset>

            {/* Bike Registration */}
            <fieldset>
              <label className="label">Bike Registration Number</label>

              <input
                className="input input-bordered w-full"
                placeholder="Dhaka Metro-LA-123456"
                {...register("bikeRegNumber", {
                  required: "Bike registration number is required",
                })}
              />

              {errors.bikeRegNumber && (
                <p className="text-error text-sm mt-1">
                  {errors.bikeRegNumber.message}
                </p>
              )}
            </fieldset>

            {/* About */}
            <fieldset>
              <label className="label">Tell Us About Yourself</label>

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Tell us about yourself"
                rows={4}
                {...register("about")}
              />
            </fieldset>

            <button
              type="submit"
              className="btn w-full bg-[#ACC857] hover:bg-[#65ac08] text-white border-none"
            >
              Submit Application
            </button>
          </form>
        </div>
      {/* image */}
        <div className="hidden md:flex justify-center">
          <img
            src={riderImg}
            alt="Be a Rider"
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default BeARider;