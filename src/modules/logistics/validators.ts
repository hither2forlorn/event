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

const assignVehicleValidation = z.object({
  vehicleId: z.number().nonnegative(),
  invitationId: z.number().nonnegative(),
  pickupTime: dateSchema.optional(),
  dropoffTime: dateSchema.optional(),
  pickupLocation: z.string().optional(),
  dropoffLocation: z.string().optional(),
})

type CreateVehicleType = z.infer<typeof createVehicleValidation>
type AssignVehicleType = z.infer<typeof assignVehicleValidation>

export { createVehicleValidation, CreateVehicleType, assignVehicleValidation, AssignVehicleType }; 
