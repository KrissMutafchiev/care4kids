/**
 * User role constants used throughout the application
 */
export const USER_ROLE = {
  TEACHER: "teacher",
  PARENT: "parent",
  DIRECTOR: "institution",
  SUPER_ADMIN: "superAdmin",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
