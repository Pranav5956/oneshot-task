export const getRandomNumber = (min, max = undefined) => {
  if (max === undefined) return Math.floor(Math.random() * min);

  return min + Math.floor(Math.random() * (max - min));
};

export const vectorizeArraysFromEmbeddings = (array, embeddings) => {
  return embeddings.map((embedding) => (array.includes(embedding) ? 1 : 0));
};
