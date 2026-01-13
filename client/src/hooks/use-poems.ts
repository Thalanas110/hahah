import { useQuery } from "@tanstack/react-query";
import { poems } from "../data/poems";

export function usePoems() {
  return useQuery({
    queryKey: ['poems'],
    queryFn: () => poems,
  });
}

export function usePoem(id: number) {
  return useQuery({
    queryKey: ['poems', id],
    queryFn: () => {
      const poem = poems.find(p => p.id === id);
      return poem || null;
    },
    enabled: !isNaN(id),
  });
}
