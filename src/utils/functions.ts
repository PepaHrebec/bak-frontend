import toast from "react-hot-toast";
import { fetcher } from "./axios";
import {
  BasicRequest,
  TranscriptionRequest,
  UserListRequest,
  UserProfile,
} from "./types";

export async function logOut(
  setValue: React.Dispatch<React.SetStateAction<UserProfile | undefined>>
) {
  await fetcher.post("/log-out");
  setValue(undefined);
}

// Removes the user from store in case of user not using the logOut function
export function handleExpiredCookie(
  data: BasicRequest | undefined,
  setValue: React.Dispatch<React.SetStateAction<UserProfile | undefined>>,
  user: UserProfile | undefined
) {
  if (data && !data.loggedIn && user) {
    setValue(undefined);
  }
}

// Gets the word and transcriptions combo
export async function loadTranscription() {
  const f = await fetcher.get<Promise<TranscriptionRequest>>("/");
  return await f.data;
}

// Gets the user list
export async function loadUserList() {
  const f =
    await fetcher.get<Promise<{ words: UserListRequest[] }>>("/repeat-list");
  return (await f.data).words;
}

// Saves the word into the user's list
export async function saveWord(originalWord: string, transcriptions: string[]) {
  try {
    await fetcher.post("/repeat-list", {
      word: originalWord,
      transcriptions: transcriptions,
    });
    toast.success("Word saved successfully!");
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

// Deletes the word from the user's list
export async function deleteFromList(itemId: string) {
  try {
    await fetcher.delete(`/repeat-list/${itemId}`);
    toast.success("Word successfully removed!");
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}
