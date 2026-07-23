import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Required Google Calendar scope
provider.addScope('https://www.googleapis.com/auth/calendar.events');

let isSigningIn = false;
let cachedAccessToken: string | null = null;
let cachedUser: User | null = null;

// Initialize auth listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      cachedUser = user;
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // If we don't have the token cached but have a user session, we need to sign-in again to get a fresh access token
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      cachedUser = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Start Google sign-in popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get Google Access Token from Firebase Auth credentials');
    }

    cachedAccessToken = credential.accessToken;
    cachedUser = result.user;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google sign-in popup failed:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const getCurrentUser = (): User | null => {
  return cachedUser;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  cachedUser = null;
};

export interface CalendarEventParams {
  title: string;
  description: string;
  startTime: string; // ISO String
  endTime: string; // ISO String
  toEmail: string;
}

export const createCalendarEvent = async (
  accessToken: string,
  params: CalendarEventParams
) => {
  const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      summary: params.title,
      description: params.description,
      location: 'Buddha House Restorative Somatic Studio & Sanctuary',
      start: {
        dateTime: params.startTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Los_Angeles',
      },
      end: {
        dateTime: params.endTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Los_Angeles',
      },
      attendees: [
        { email: params.toEmail, responseStatus: 'accepted' }
      ],
      reminders: {
        useDefault: true
      }
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Google Calendar API call failed: ${errorBody}`);
  }

  return response.json();
};

export function parseDateTimeWithDuration(dateStr: string, timeStr: string, durationMinutes: number): { startISO: string; endISO: string } {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  
  // Construct in local time zone
  const start = new Date(dateStr);
  start.setHours(hours, minutes, 0, 0);
  
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  
  return {
    startISO: start.toISOString(),
    endISO: end.toISOString()
  };
}
