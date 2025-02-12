import { useState } from "react";
import { signUp, login } from "../services/authService";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function handleAuth() {
    try {
      if (isSignUp) {
        await signUp(email, password);
        alert("Signup successful! You can now log in.");
      } else {
        await login(email, password);
        alert("Login successful!");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{isSignUp ? "Sign Up" : "Login"}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={handleAuth} className="w-full bg-blue-500 text-white p-2 rounded">
        {isSignUp ? "Sign Up" : "Login"}
      </button>
      <p className="mt-2 text-sm cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign up"}
      </p>
    </div>
  );
}
