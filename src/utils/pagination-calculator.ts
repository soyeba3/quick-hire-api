export const paginationCalculator = (limit?: string, offset?: string) => {
  if (!limit || !offset) {
    return {
      offset: undefined,
      limit: undefined,
    };
  }

  const offsetNumber = isNaN(+offset) ? 1 : +offset;
  const limitNumber = isNaN(+limit) ? 0 : +limit;

  return {
    offset: offsetNumber > 1 ? (offsetNumber - 1) * limitNumber : 0,
    limit: limitNumber,
  };
};
