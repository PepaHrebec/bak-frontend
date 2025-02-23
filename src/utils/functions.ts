import { fetcher } from "./axios";
import { BasicRequest, TranscriptionRequest, UserProfile } from "./types";

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
    console.log("HIT");
    console.log(data, data.loggedIn, user);
    setValue(undefined);
  }
}

export async function load() {
  const f = await fetcher.get<Promise<TranscriptionRequest>>("/");
  return await f.data;
}
