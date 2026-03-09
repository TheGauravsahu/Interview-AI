import { useState } from "react";
import Buttton from "../../../components/Buttton";
import { Link } from "react-router";
import { useSignin } from "../hooks/useSignin.js";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = useSignin();
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn.mutate({ email, password });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="rounded-lg h-80  w-96">
        <h1 className="font-bold text-2xl mb-4">Sign In</h1>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-2xl py-2 p-4 border bg-white text-black placeholder:text-gray-400 "
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
              className="rounded-2xl py-2 p-4 border bg-white text-black placeholder:text-gray-400"
              required
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <Buttton
            className="bg-fuchsia-500"
            isLoading={false}
            loadingText={"Signing in..."}
          >
            Signin
          </Buttton>

          <span className="mt-4">
            Don&apos;t have an account?{" "}
            <Link className="text-fuchsia-400" to="/sign-up">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
