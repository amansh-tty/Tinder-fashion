import { supabase } from "../../../backend/src/config/supabase";

// Signup Function
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data.user;
}

// Login Function
export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

// Logout Function
export async function logout() {
  await supabase.auth.signOut();
}
