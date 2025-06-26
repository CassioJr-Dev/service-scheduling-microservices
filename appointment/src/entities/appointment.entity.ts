import { $Enums, Appointment } from '@prisma/client'

export class AppointmentEntity implements Appointment {
  appointmentId: string
  clientId: string
  serviceId: string
  status: $Enums.AppointmentStatus
  createdAt: Date
  updatedAt: Date
}

export const AppointmentStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const

export type AppointmentStatus =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus]
