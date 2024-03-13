import { z } from "zod";

// Utils
import { plateRegex } from "@/utils/regex";

export const carSchema = z.object({
  plate: z.string().regex(plateRegex, "Placa inválida. Ex: AAA-0000"),
});
