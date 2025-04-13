export interface BaseEntity {
  createdAt: Date;
  createdUserId: string;

  updatedAt: Date;
  updatedUserId: string;

  deletedAt?: Date;
  deletedUserId?: string;
}
