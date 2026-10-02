export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  expires_at?: number;
  user: AuthUser;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
const SESSION_KEY = 'AI_FOR_KIDS_SUPABASE_SESSION_V1';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

function requireConfig() {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_PUBLISHABLE_KEY.');
  }
}

function saveSession(session: AuthSession | null) {
  if (!session) localStorage.removeItem(SESSION_KEY);
  else localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getStoredSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function authRequest(path: string, body: Record<string, unknown>) {
  requireConfig();
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.msg || data?.message || data?.error_description || 'Permintaan autentikasi gagal.');
  }
  return data as AuthSession;
}

export async function signUp(email: string, password: string, fullName: string) {
  const session = await authRequest('signup', {
    email,
    password,
    data: { full_name: fullName },
  });
  if (session?.access_token) saveSession(session);
  return session;
}

export async function signIn(email: string, password: string) {
  const session = await authRequest('token?grant_type=password', { email, password });
  saveSession(session);
  return session;
}

export async function refreshSession(refreshToken: string) {
  const session = await authRequest('token?grant_type=refresh_token', {
    refresh_token: refreshToken,
  });
  saveSession(session);
  return session;
}

export function signOut() {
  saveSession(null);
}

export async function getPremiumStatus(userId: string, accessToken: string) {
  requireConfig();
  const url = new URL(`${SUPABASE_URL}/rest/v1/subscriptions`);
  url.searchParams.set('select', 'access_level,status,expires_at');
  url.searchParams.set('user_id', `eq.${userId}`);
  url.searchParams.set('status', 'eq.active');
  url.searchParams.set('order', 'created_at.desc');
  url.searchParams.set('limit', '1');

  const response = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) return false;
  const rows = (await response.json()) as Array<{ access_level?: string; status?: string; expires_at?: string | null }>;
  const row = rows[0];
  if (!row || row.access_level !== 'premium' || row.status !== 'active') return false;
  if (row.expires_at && new Date(row.expires_at).getTime() < Date.now()) return false;
  return true;
}


export async function activatePremiumForUser(email: string, accessToken: string) {
  requireConfig();
  const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-activate-premium`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, product_code: 'AI_FOR_KIDS_FULL' }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || 'Aktivasi Premium gagal.');
  }
  return data as {
    ok: boolean;
    email: string;
    user_id: string;
    product_code: string;
    access_level: string;
    status: string;
  };
}
