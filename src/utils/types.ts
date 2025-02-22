export interface UserProfile {
  name: string;
  id: string;
}

export interface BasicRequest {
  loggedIn: boolean;
}

export interface TranscriptionRequest extends BasicRequest {
  originalWord: string;
  transcriptions: string[];
  wordIsInList: boolean;
  loggedIn: boolean;
}

export interface UserAuthValues {
  name: string;
  password: string;
}
