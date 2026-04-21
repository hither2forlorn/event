import z from "zod"
import { dateSchema } from "@/utils/baseValidation"

const createVehicleValidation = z.object({
  vehicleName: z.string().nonempty(),
  driverName: z.string().optional(),
  driverNumber: z.string().optional(),
  capacity: z.number().nonnegative(),
  availablityStartTime: dateSchema,
  availablityEndTime: dateSchema,
})
type CreateVehicleType = z.infer<typeof createVehicleValidation>
export { createVehicleValidation, CreateVehicleType }; 
