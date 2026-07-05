import { useForm } from "react-hook-form";


const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm;

  const handleSendParcel = (data) => {
    console.log(data);
    
  };
  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>

      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* document */}
        <div>

            <label className="label">
                     <input type="radio"
                     {...register("parcelType")}
                     value='document' className="radio" defaultChecked />
                Document
            </label>
            <label className="label">
                     <input type="radio"
                     {...register("parcelType")}
                     value='non-document' className="radio"  />
               Non-Document
            </label>
        </div>
        {/* parcel Info Name wight */}
        <div></div>
        {/* two column */}
        <div>
          {/* sender   */}
          <div></div>
          {/* receiver info*/}
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
