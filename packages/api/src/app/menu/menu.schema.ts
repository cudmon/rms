import { z } from "zod";
import { ZodPipe } from "@/pipes/zod.pipe";

export const createMenuSchema = new ZodPipe(
  z.object({
    name: z.string().max(255),
    price: z.number().min(0),
    image: z.string().max(255),
  })
);

export const updateMenuSchema = new ZodPipe(
  z.object({
    name: z.string().max(255).optional(),
    price: z.number().min(0).optional(),
    image: z.string().max(255).optional(),
  })
);
