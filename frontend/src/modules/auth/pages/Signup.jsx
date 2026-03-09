import Buttton from "../../../components/Buttton";
import { Link } from "react-router";
import { useSignup } from "../hooks/useSignup";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const signUp = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp.mutate({ username, email, password });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="rounded-lg h-80 w-96">
        <h1 className="font-bold text-2xl mb-4">Sign Up</h1>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-2xl py-2 p-4 border bg-white placeholder:text-gray-400 text-black"
              required
              name="username"
              placeholder="Enter username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-2xl py-2 p-4 border bg-white placeholder:text-gray-400 text-black"
              required
              type="email"
              name="email"
              placeholder="Enter email address"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-2xl py-2 p-4 border bg-white placeholder:text-gray-400 text-black"
              required
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>

          <Buttton isLoading={signUp.isLoading} loadingText={"Signing up..."}>
            Signup
          </Buttton>
          <span className="mt-8">
            Already have an account?{" "}
            <Link className="text-fuchsia-400 hover:underline" to="/sign-in">
              Sign In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
