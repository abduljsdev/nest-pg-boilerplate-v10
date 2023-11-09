import { In } from 'typeorm';

export const findService = async (
  repository,
  type:
    | 'find'
    | 'findPaginate'
    | 'findOne'
    | 'filter'
    | 'count'
    | 'countBy'
    | 'findAndCount'
    | 'findAndCountBy'
    | 'findByIds'
    | 'exist',
  options?: {},
  paginateOptions?: { offset?: number; limit?: number },
  optArray?: [],
  relationsOptions?: {},
) => {
  switch (type) {
    case 'find':
      return repository.find({
        where: options,
        relations: relationsOptions,
      });
      break;
    case 'findPaginate':
      const [items, count] = await repository.findAndCount({
        where: options,
        relations: relationsOptions,
        order: {
          id: 'ASC',
        },
        skip: paginateOptions.offset,
        take: paginateOptions.limit,
      });

      return {
        items,
        count,
      };
      break;
    case 'findOne':
      return repository.findOne({
        where: options,
        relations: relationsOptions,
      });
      break;
    case 'filter':
      return repository.find({
        where: options,
      });
      break;
    case 'count':
      return repository.count();
      break;
    case 'countBy':
      return repository.countBy(options);
      break;
    case 'findAndCount':
      return repository.findAndCount();
      break;
    case 'findAndCountBy':
      return repository.findAndCountBy(options);
      break;
    case 'findByIds':
      return repository.findBy({ id: In(optArray) });
      break;
    case 'exist':
      return repository.exist();
      break;
    default:
      break;
  }
};
