import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiossecure from "../../Hooks/useAxiossecure";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiossecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-8xl bg-red-500">All My Parcels : {parcels.length}</h2>
    </div>
  );
};

export default MyParcel;
