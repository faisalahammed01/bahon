import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const serviceCenters = useLoaderData();
  const regionDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionDuplicate)];

  const senderRegion = watch("senderRegion");

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const district = regionDistricts.map((d) => d.district);
    return district;
  };
  console.log(regions);

  const handleSendParcel = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>

      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* Parcel Type */}
        <div className="my-5">
          <label className="label cursor-pointer">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            <span className="ml-2">Document</span>
          </label>

          <label className="label cursor-pointer">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            <span className="ml-2">Non-Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              className="input"
              {...register("parcelName")}
              placeholder="Parcel Name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              className="input"
              {...register("parcelWeight")}
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender */}
          <fieldset className="fieldset space-y-2">
            <h4 className="text-2xl font-semibold">Sender Details</h4>

            <label className="label">Sender Name</label>
            <input
              className="input"
              {...register("senderName")}
              placeholder="Sender Name"
            />

            <label className="label">Sender Email</label>
            <input
              type="email"
              className="input"
              {...register("senderEmail")}
              placeholder="Sender Email"
            />
            {/* select region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a browser"
                className="select"
              >
                <option disabled={true}>Pick a Regions</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender district</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            <label className="label">Sender Address</label>
            <input
              className="input"
              {...register("senderAddress")}
              placeholder="Sender Address"
            />

            <label className="label">Sender Phone No</label>
            <input
              type="number"
              className="input"
              {...register("senderPhone")}
              placeholder="Sender Phone No"
            />

            <label className="label">Sender District</label>
            <input
              className="input"
              {...register("senderDistrict")}
              placeholder="Select District"
            />

            <label className="label">Pickup Instruction</label>
            <input
              className="input"
              {...register("pickupInstruction")}
              placeholder="Pickup Instruction"
            />
          </fieldset>

          {/* Receiver */}
          <fieldset className="fieldset space-y-2">
            <h4 className="text-2xl font-semibold">Receiver Details</h4>

            <label className="label">Receiver Name</label>
            <input
              className="input"
              {...register("receiverName")}
              placeholder="Receiver Name"
            />

            <label className="label">Receiver Email</label>
            <input
              type="email"
              className="input"
              {...register("receiverEmail")}
              placeholder="Receiver Email"
            />

            <label className="label">Receiver Address</label>
            <input
              className="input"
              {...register("receiverAddress")}
              placeholder="Receiver Address"
            />

            <label className="label">Receiver Phone No</label>
            <input
              type="number"
              className="input"
              {...register("receiverPhone")}
              placeholder="Receiver Phone No"
            />

            <label className="label">Receiver District</label>
            <input
              className="input"
              {...register("receiverDistrict")}
              placeholder="Select District"
            />

            <label className="label">Delivery Instruction</label>
            <input
              className="input"
              {...register("deliveryInstruction")}
              placeholder="Delivery Instruction"
            />
          </fieldset>
        </div>

        {/* Submit Button */}
        <div className="items-center">
          <button className="btn btn-primary text-black  mt-8">
            Send Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
