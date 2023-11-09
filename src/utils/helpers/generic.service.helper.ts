import {
  Between,
  Equal,
  IsNull,
  LessThan,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

export const genericService = async (
  repository,
  type:
    | 'equal'
    | 'isNull'
    | 'lessThen'
    | 'moreThan'
    | 'moreThanOrEqual'
    | 'findNot'
    | 'Between',
  columnName: string,
  option1: string,
  option2: string,
) => {
  switch (type) {
    case 'equal':
      return repository.findOne({
        where: { id: Equal(option1) },
      });
      break;
    case 'isNull':
      return repository.findOne({
        where: { firstName: IsNull() },
      });
      break;
    case 'findNot':
      return repository.find({
        where: { lastName: Not(option1) },
      });
      break;
    case 'lessThen':
      return repository.find({
        where: { id: LessThan(option1) },
      });
      break;
    case 'moreThan':
      return repository.find({
        where: { id: MoreThan(option1) },
      });
      break;
    case 'moreThanOrEqual':
      return repository.find({
        where: { id: MoreThanOrEqual(option1) },
      });
      break;
    case 'Between':
      return repository.find({
        where: { createdAt: Between(option1, option2) },
      });
      break;
    default:
      break;
  }
};
