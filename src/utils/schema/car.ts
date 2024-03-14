import { z } from "zod";

// Utils
import { plateRegex } from "@/utils/regex";

export const errorMessage = "Placa inválida. Ex: AAA-0000";

export const carSchema = z.object({
  plate: z
    .string()
    .min(8, errorMessage)
    .max(8, errorMessage)
    .regex(plateRegex, errorMessage),
});
