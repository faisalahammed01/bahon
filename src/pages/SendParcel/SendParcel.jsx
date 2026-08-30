import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  Package,
  User,
  Mail,
  MapPin,
  Phone,
  ClipboardList,
  Truck,
  Send,
  Scale,
  Navigation,
  FileText,
} from "lucide-react";
import useAxiossecure from "../../Hooks/useAxiossecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const axiosSecure = useAxiossecure();

  const serviceCenters = useLoaderData();
  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  const senderRegion = useWatch({
    control,
    name: "senderRegion",
  });

  const receiverRegion = useWatch({
    control,
    name: "receiverRegion",
  });

  const districtsByRegion = (region) => {
    if (!region) return [];

    return serviceCenters
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  const calculateCost = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight) || 0;

    if (isDocument) {
      return isSameDistrict ? 60 : 80;
    }

    if (parcelWeight <= 3) {
      return isSameDistrict ? 110 : 150;
    }

    const baseCharge = isSameDistrict ? 110 : 150;

    const extraWeight = parcelWeight - 3;

    const extraCharge = isSameDistrict
      ? extraWeight * 40
      : extraWeight * 40 + 40;

    return baseCharge + extraCharge;
  };

  const handleSendParcel = (data) => {
    const cost = calculateCost(data);

    data.cost = cost;

    Swal.fire({
      title: "Confirm Parcel Booking",
      html: `
        <div style="text-align:left">
          <p><b>Parcel:</b> ${data.parcelName || "N/A"}</p>
          <p><b>Type:</b> ${data.parcelType}</p>
          <p><b>Weight:</b> ${data.parcelWeight || 0} KG</p>
          <p><b>From:</b> ${data.senderDistrict || "-"} → <b>To:</b> ${
            data.receiverDistrict || "-"
          }</p>
          <p style="margin-top:8px;font-size:18px">
            <b>Total Cost: ৳${cost}</b>
          </p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Send",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        // send `data` + `cost` to backend here
        axiosSecure
          .post("/parcels", data)
          .then((response) => {
            console.log("Parcel sent to backend:", response.data);
          })
          .catch((error) => {
            console.error("Error sending parcel to backend:", error);
          });

        Swal.fire({
          title: "Parcel Booked!",
          text: `Your parcel has been booked successfully. Total cost: ৳${cost}`,
          icon: "success",
          confirmButtonColor: "#16a34a",
          showConfirmButton: false,
          timer: 2000,
        });

        reset();
        navigate("/dashboard/myparcels");
      }
    });
  };

  const inputClass =
    "input input-bordered w-full h-12 rounded-xl bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200";

  const selectClass =
    "select select-bordered w-full h-12 rounded-xl bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200";

  const labelClass = "text-sm font-semibold text-slate-700 mb-1.5 block";

  return (
    <div className="w-full bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-7 md:p-10 mb-8 shadow-xl shadow-blue-100">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10" />

          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-white/5" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium mb-4">
                <Truck size={16} />
                Fast & Reliable Delivery
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Send A Parcel
              </h2>

              <p className="text-blue-100 mt-3 max-w-xl text-sm md:text-base">
                Fill in the details below to schedule your parcel delivery
                quickly and securely.
              </p>
            </div>

            <div className="hidden md:flex w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm items-center justify-center border border-white/20">
              <Package size={48} className="text-white" />
            </div>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-8">
          {/* ================= PARCEL INFORMATION ================= */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-8">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <Package className="text-blue-600" size={22} />
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                  Parcel Information
                </h3>

                <p className="text-sm text-slate-500">
                  Tell us about the parcel you're sending
                </p>
              </div>
            </div>

            {/* Parcel Type */}
            <div className="mb-7">
              <label className="text-sm font-semibold text-slate-700 mb-3 block">
                Parcel Type
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {/* Document */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    {...register("parcelType", {
                      required: true,
                    })}
                    value="document"
                    className="peer hidden"
                    defaultChecked
                  />

                  <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all duration-200">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                      <FileText size={21} className="text-blue-600" />
                    </div>

                    <div>
                      <p className="font-bold text-slate-800">Document</p>

                      <p className="text-xs text-slate-500">
                        Papers, letters & files
                      </p>
                    </div>
                  </div>
                </label>

                {/* Non Document */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    {...register("parcelType", {
                      required: true,
                    })}
                    value="non-document"
                    className="peer hidden"
                  />

                  <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all duration-200">
                    <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <Package size={21} className="text-indigo-600" />
                    </div>

                    <div>
                      <p className="font-bold text-slate-800">Non-Document</p>

                      <p className="text-xs text-slate-500">
                        Products & packages
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Parcel Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Parcel Name */}
              <fieldset>
                <label className={labelClass}>
                  Parcel Name <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    className={`${inputClass} pl-11`}
                    {...register("parcelName", {
                      required: true,
                    })}
                    placeholder="Enter parcel name"
                  />
                </div>

                {errors.parcelName && (
                  <p className="text-red-500 text-xs mt-1.5">
                    Parcel name is required
                  </p>
                )}
              </fieldset>

              {/* Parcel Weight */}
              <fieldset>
                <label className={labelClass}>
                  Parcel Weight (KG) <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Scale
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    step="0.1"
                    className={`${inputClass} pl-11`}
                    {...register("parcelWeight", {
                      required: true,
                      min: 0.1,
                    })}
                    placeholder="e.g. 2.5"
                  />
                </div>

                {errors.parcelWeight && (
                  <p className="text-red-500 text-xs mt-1.5">
                    Enter a valid weight
                  </p>
                )}
              </fieldset>
            </div>
          </div>

          {/* ================= SENDER & RECEIVER ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* ================= SENDER ================= */}
            <fieldset className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-5 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Navigation size={21} className="text-emerald-600" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-800">
                      Sender Details
                    </h4>

                    <p className="text-sm text-slate-500">
                      Where should we pick up the parcel?
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Sender Name */}
                <div>
                  <label className={labelClass}>
                    Sender Name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      readOnly={!!user?.displayName}
                      defaultValue={user?.displayName || ""}
                      className={`${inputClass} pl-11`}
                      {...register("senderName", {
                        required: true,
                      })}
                      placeholder="Sender Name"
                    />
                  </div>
                </div>

                {/* Sender Email */}
                <div>
                  <label className={labelClass}>
                    Sender Email <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      defaultValue={user?.email}
                      readOnly={!!user?.email}
                      className={`${inputClass} pl-11`}
                      {...register("senderEmail", {
                        required: true,
                      })}
                      placeholder="Sender Email"
                    />
                  </div>
                </div>

                {/* Sender Region */}
                <div>
                  <label className={labelClass}>
                    Sender Region <span className="text-red-500">*</span>
                  </label>

                  <select
                    {...register("senderRegion", {
                      required: true,
                    })}
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Pick a Region
                    </option>

                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sender District */}
                <div>
                  <label className={labelClass}>
                    Sender District <span className="text-red-500">*</span>
                  </label>

                  <select
                    {...register("senderDistrict", {
                      required: true,
                    })}
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Pick a District
                    </option>

                    {districtsByRegion(senderRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sender Address */}
                <div>
                  <label className={labelClass}>
                    Sender Address <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      className={`${inputClass} pl-11`}
                      {...register("senderAddress", {
                        required: true,
                      })}
                      placeholder="Enter pickup address"
                    />
                  </div>
                </div>

                {/* Sender Phone */}
                <div>
                  <label className={labelClass}>
                    Sender Phone No <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      className={`${inputClass} pl-11`}
                      {...register("senderPhone", {
                        required: true,
                      })}
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                </div>

                {/* Pickup Instruction */}
                <div>
                  <label className={labelClass}>Pickup Instruction</label>

                  <div className="relative">
                    <ClipboardList
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      className={`${inputClass} pl-11`}
                      {...register("pickupInstruction")}
                      placeholder="Any pickup instructions?"
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* ================= RECEIVER ================= */}
            <fieldset className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                    <MapPin size={21} className="text-blue-600" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-800">
                      Receiver Details
                    </h4>

                    <p className="text-sm text-slate-500">
                      Where should we deliver the parcel?
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Receiver Name */}
                <div>
                  <label className={labelClass}>
                    Receiver Name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      className={`${inputClass} pl-11`}
                      {...register("receiverName", {
                        required: true,
                      })}
                      placeholder="Receiver Name"
                    />
                  </div>
                </div>

                {/* Receiver Email */}
                <div>
                  <label className={labelClass}>
                    Receiver Email <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      className={`${inputClass} pl-11`}
                      {...register("receiverEmail", {
                        required: true,
                      })}
                      placeholder="Receiver Email"
                    />
                  </div>
                </div>

                {/* Receiver Region */}
                <div>
                  <label className={labelClass}>
                    Receiver Region <span className="text-red-500">*</span>
                  </label>

                  <select
                    {...register("receiverRegion", {
                      required: true,
                    })}
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Pick a Region
                    </option>

                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Receiver District */}
                <div>
                  <label className={labelClass}>
                    Receiver District <span className="text-red-500">*</span>
                  </label>

                  <select
                    {...register("receiverDistrict", {
                      required: true,
                    })}
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Pick a District
                    </option>

                    {districtsByRegion(receiverRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Receiver Address */}
                <div>
                  <label className={labelClass}>
                    Receiver Address <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      className={`${inputClass} pl-11`}
                      {...register("receiverAddress", {
                        required: true,
                      })}
                      placeholder="Enter delivery address"
                    />
                  </div>
                </div>

                {/* Receiver Phone */}
                <div>
                  <label className={labelClass}>
                    Receiver Phone No <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      className={`${inputClass} pl-11`}
                      {...register("receiverPhone", {
                        required: true,
                      })}
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                </div>

                {/* Delivery Instruction */}
                <div>
                  <label className={labelClass}>Delivery Instruction</label>

                  <div className="relative">
                    <ClipboardList
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      className={`${inputClass} pl-11`}
                      {...register("deliveryInstruction")}
                      placeholder="Any delivery instructions?"
                    />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          {/* ================= SUBMIT ================= */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-7">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Send className="text-blue-600" size={22} />
                </div>

                <div>
                  <h4 className="font-bold text-slate-800">Ready to send?</h4>

                  <p className="text-sm text-slate-500">
                    Review your information and book the parcel.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="group w-full md:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-9 py-3.5 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300"
              >
                <Send
                  size={19}
                  className="group-hover:translate-x-1 transition-transform"
                />
                Send Parcel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
