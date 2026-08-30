import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiossecure from "./useAxiossecure";


const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiossecure();

  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${user.email}/role`
      );

      return res.data.role;
    },
  });

  return { role, isLoading };
};

export default useRole;