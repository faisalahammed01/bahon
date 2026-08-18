import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
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

  const {user} = useAuth();

  const axiosSecure = useAxiossecure();

  const serviceCenters = useLoaderData();
  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

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
    data.cost = cost; // Add cost to the data object

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
          <p style="margin-top:8px;font-size:18px"><b>Total Cost: ৳${cost}</b></p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Send",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    }).then((result) => {
      if (result.isConfirmed) {
        //  send `data` + `cost` to backend here
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Send A Parcel</h2>

      <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-10">
        {/* Parcel Type */}
        <div className="flex gap-6">
          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              {...register("parcelType", { required: true })}
              value="document"
              className="radio radio-success"
              defaultChecked
            />
            <span>Document</span>
          </label>

          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              {...register("parcelType", { required: true })}
              value="non-document"
              className="radio radio-success"
            />
            <span>Non-Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              className="input w-full"
              {...register("parcelName", { required: true })}
              placeholder="Parcel Name"
            />
            {errors.parcelName && (
              <p className="text-error text-sm mt-1">Parcel name is required</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              step="0.1"
              className="input w-full"
              {...register("parcelWeight", { required: true, min: 0.1 })}
              placeholder="Parcel Weight"
            />
            {errors.parcelWeight && (
              <p className="text-error text-sm mt-1">Enter a valid weight</p>
            )}
          </fieldset>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender */}
          <fieldset className="fieldset space-y-3 border border-green-200 rounded-2xl p-6">
            <h4 className="text-2xl font-semibold mb-2">Sender Details</h4>

            <label className="label">Sender Name</label>
            <input type="text"
             readOnly={!!user?.displayName}
             defaultValue={user?.displayName || ""}
              className="input w-full"
              {...register("senderName", { required: true })}
              placeholder="Sender Name"
            />

            <label className="label">Sender Email</label>
            <input
              type="email"
              defaultValue={user?.email }
               readOnly={!!user?.email}
              className="input w-full"
              {...register("senderEmail", { required: true })}
              placeholder="Sender Email"
            />

            <label className="label">Sender Region</label>
            <select
              {...register("senderRegion", { required: true })}
              defaultValue=""
              className="select w-full"
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

            <label className="label">Sender District</label>
            <select
              {...register("senderDistrict", { required: true })}
              defaultValue=""
              className="select w-full"
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

            <label className="label">Sender Address</label>
            <input
              className="input w-full"
              {...register("senderAddress", { required: true })}
              placeholder="Sender Address"
            />

            <label className="label">Sender Phone No</label>
            <input
              type="tel"
              className="input w-full"
              {...register("senderPhone", { required: true })}
              placeholder="Sender Phone No"
            />

            <label className="label">Pickup Instruction</label>
            <input
              className="input w-full"
              {...register("pickupInstruction")}
              placeholder="Pickup Instruction"
            />
          </fieldset>

          {/* Receiver */}
          <fieldset className="fieldset space-y-3 border border-green-200 rounded-2xl p-6">
            <h4 className="text-2xl font-semibold mb-2">Receiver Details</h4>

            <label className="label">Receiver Name</label>
            <input
              className="input w-full"
              {...register("receiverName", { required: true })}
              placeholder="Receiver Name"
            />

            <label className="label">Receiver Email</label>
            <input
              type="email"
              className="input w-full"
              {...register("receiverEmail", { required: true })}
              placeholder="Receiver Email"
            />

            <label className="label">Receiver Region</label>
            <select
              {...register("receiverRegion", { required: true })}
              defaultValue=""
              className="select w-full"
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

            <label className="label">Receiver District</label>
            <select
              {...register("receiverDistrict", { required: true })}
              defaultValue=""
              className="select w-full"
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

            <label className="label">Receiver Address</label>
            <input
              className="input w-full"
              {...register("receiverAddress", { required: true })}
              placeholder="Receiver Address"
            />

            <label className="label">Receiver Phone No</label>
            <input
              type="tel"
              className="input w-full"
              {...register("receiverPhone", { required: true })}
              placeholder="Receiver Phone No"
            />

            <label className="label">Delivery Instruction</label>
            <input
              className="input w-full"
              {...register("deliveryInstruction")}
              placeholder="Delivery Instruction"
            />
          </fieldset>
        </div>

        {/* Submit Button */}
        <div>
          <button className="btn bg-[#ACC857] hover:bg-[#65ac08] text-white px-10">
            Send Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
