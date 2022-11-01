import { Model, snakeCaseMappers } from 'objection';

export default abstract class BaseModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  id: number;

  createdAt: string;
  updatedAt: string;

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
