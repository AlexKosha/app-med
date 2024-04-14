export const getTwoRandomTherapies = (therapies) => {
  const randomTherapies = [];
  const therapyCount = therapies.length;

  const randomIndex1 = Math.floor(Math.random() * therapyCount);
  let randomIndex2 = Math.floor(Math.random() * therapyCount);

  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * therapyCount);
  }

  randomTherapies.push(therapies[randomIndex1]);
  randomTherapies.push(therapies[randomIndex2]);

  return randomTherapies;
};
