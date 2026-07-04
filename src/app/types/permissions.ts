export const Permission = {
  ADD_STUDENT : "ADD_STUDENT",
  UPDATE_STUDENT : "UPDATE_STUDENT",
  DELETE_STUDENT : "DELETE_STUDENT",
  VIEW_STUDENT : "VIEW_STUDENT",
} as const;

export type Permission = typeof Permission[keyof typeof Permission];