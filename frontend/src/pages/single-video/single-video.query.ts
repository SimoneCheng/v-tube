import { useQuery } from "@tanstack/react-query";
import { getSingleVideo } from "./single-video.api";

export const useGetSingleVideoQuery = ({ id }: { id: string | number; }) => {
  return useQuery({
    queryKey: ['single-video', id],
    queryFn: () => getSingleVideo({ id }),
  });
};
