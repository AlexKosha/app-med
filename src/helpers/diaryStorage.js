import * as SecureStore from "expo-secure-store";

export const getStoredFavoritesDiaries = async () => {
  try {
    const storedDiaries = await SecureStore.getItemAsync("diaries");
    // console.log(storedDiaries, "----Storage DIARIES----");
    const favorites = storedDiaries ? JSON.parse(storedDiaries) : [];
    return favorites;
  } catch (error) {
    console.error("Failed to get favorites from storage:", error);
    return [];
  }
};

export const saveDiaryToStorage = async (diaries) => {
  try {
    await SecureStore.setItemAsync("diaries", JSON.stringify(diaries));
  } catch (error) {
    console.error("Failed to save data to storage:", error);
  }
};
