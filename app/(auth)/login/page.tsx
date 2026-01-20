"use client";

import { Key, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useAuth";

interface LoginFormValues {
  client_id: string;
  client_secret: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate({
      client_id: data.client_id,
      client_secret: data.client_secret,
      grant_type: "client_credentials"
    });
  };

  const isLoading = loginMutation.status === 'pending';

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left – Branding (Luxury Gold) */}
      <div className="relative hidden lg:flex w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#5B3A00] via-[#C79F3F] to-[#FFF1A8] p-12 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_70%)] animate-pulse-slow pointer-events-none" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold-300/20 blur-2xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-gold-400/25 blur-2xl" />
        <div className="absolute top-10 right-10 h-24 w-24 rotate-12 rounded-2xl border border-white/10 opacity-30" />
        <div className="absolute bottom-32 left-20 h-32 w-32 rotate-45 rounded-xl border border-white/15 opacity-20" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/25 backdrop-blur-md shadow-md text-2xl font-bold animate-pulse-slow">
              G
            </div>
            <h1 className="text-2xl font-extrabold tracking-wide drop-shadow-lg">
              GIFT
            </h1>
          </div>

          <h2 className="mt-20 max-w-md text-4xl font-semibold leading-snug drop-shadow-lg">
            Gold International Fast Transfer Platform
          </h2>

          <p className="mt-4 max-w-md text-white/90 text-sm leading-relaxed drop-shadow-sm">
            Secure, gold-backed transfers worldwide. Instant, trusted, and
            institutional-grade.
          </p>
        </div>

        <p className="relative z-10 text-sm text-white/70 mt-6 drop-shadow-sm">
          © {new Date().getFullYear()} GIFT Platform. All rights reserved.
        </p>
      </div>

      {/* Right – Auth Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="mt-1 text-sm text-slate-500">
              Sign in to your GIFT dashboard
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Client ID */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Client ID
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Enter client_id"
                  className="pl-10"
                  {...register("client_id")}
                />
              </div>
            </div>

            {/* Client Secret */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Client Secret
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="password"
                  placeholder="Enter client_secret"
                  className="pl-10"
                  {...register("client_secret")}
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gold-600 hover:bg-gold-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            {loginMutation.error && (
              <p className="text-sm text-red-500 mt-2">
                Login failed. Please check your credentials.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
