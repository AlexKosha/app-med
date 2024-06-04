import * as SecureStore from "expo-secure-store";

export const getStoredFavorites = async () => {
  const storedFavorites = await SecureStore.getItemAsync("meditations");
  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  return favorites;
};

export const saveMeditationsToStorage = async (favorites) => {
  await SecureStore.setItemAsync("meditations", JSON.stringify(favorites));
};
