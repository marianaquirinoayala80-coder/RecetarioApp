import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY = "@favorites_v1";

export async function getFavorites() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function setFavorites(list) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function toggleFavorite(recipe) {
  const list = await getFavorites();
  const exists = list.find(r => r._id === recipe._id);
  let next;
  if (exists) next = list.filter(r => r._id !== recipe._id);
  else next = [recipe, ...list];
  await setFavorites(next);
  return next;
}
