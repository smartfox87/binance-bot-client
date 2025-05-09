export const processThreads = (data) =>
  data.map(
    ({ index, data: { iteration, duration, items } }) => ({
      index,
      iteration,
      duration,
      items: items.length,
    }),
    {},
  );
