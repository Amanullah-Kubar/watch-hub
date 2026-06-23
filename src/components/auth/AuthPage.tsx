// AuthPage.tsx
import { type FormEvent, useState } from "react";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    useSignIn,
    useSignUp,
} from "@clerk/clerk-react";

import {
    login,
    signup,
    googleLogin,
    getErrorMessage,
} from "./authServices";

function AuthPage() {

    const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();

    const {
        signUp,
        isLoaded: signUpLoaded,
    } = useSignUp();
    const navigate = useNavigate();

    const [page, setPage] = useState<'login' | 'signup'>('login')
    const [showPassword, setShowPassword] = useState(false);
    const [credError, setCredError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredError(null); // Clear any existing error when user starts typing
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Lenient version for inline UI feedback while typing (don't yell at the
    // user just because they haven't reached the confirm-password field yet)
    const passMatch = form.password === form.confirmPassword || form.confirmPassword === '';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCredError(null);

        if (
            page === "signup" &&
            form.password !== form.confirmPassword
        ) {
            setCredError("Passwords do not match");
            return;
        }

        setIsSubmitting(true);

        try {
            if (page === "login") {
                if (!signInLoaded) return;

                const result = await login(
                    signIn,
                    form.email,
                    form.password
                );

                if (result.status === "complete") {
                    await setActive({
                        session: result.createdSessionId,
                    });

                    navigate("/");
                }
            }

            if (page === "signup") {
                if (!signUpLoaded) return;

                await signup(
                    signUp,
                    form.name,
                    form.email,
                    form.password,
                    form.phone
                );

                navigate("/verify-email");
            }
        } catch (err) {
            setCredError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = (
        <>
            {page === 'signup' && (
                <div>
                    <label className="flex flex-col gap-2 text-sm text-[#F8F5F0]/80">
                        Full Name
                        <input
                            onChange={handleChange}
                            value={form.name}
                            name="name"
                            type="text"
                            placeholder="Your name"
                            className="rounded-2xl bg-[#151515]/80 border border-white/10 px-4 py-3 text-sm text-[#F8F5F0] placeholder:text-[#F8F5F0]/40 focus:border-[#D6B98C]/70 focus:outline-none focus:ring-2 focus:ring-[#D6B98C]/15 transition"
                        />
                    </label>
                </div>

            )}

            <label className="flex flex-col gap-2 text-sm text-[#F8F5F0]/80">
                Email address
                <input
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="rounded-2xl bg-[#151515]/80 border border-white/10 px-4 py-3 text-sm text-[#F8F5F0] placeholder:text-[#F8F5F0]/40 focus:border-[#D6B98C]/70 focus:outline-none focus:ring-2 focus:ring-[#D6B98C]/15 transition"
                />
            </label>

            {page === 'signup' &&
                <label className="flex flex-col gap-2 text-sm text-[#F8F5F0]/80">
                    Phone Number
                    <input
                        value={form.phone}
                        onChange={handleChange}
                        name="phone"
                        type="tel"
                        placeholder="03012334567"
                        className="rounded-2xl bg-[#151515]/80 border border-white/10 px-4 py-3 text-sm text-[#F8F5F0] placeholder:text-[#F8F5F0]/40 focus:border-[#D6B98C]/70 focus:outline-none focus:ring-2 focus:ring-[#D6B98C]/15 transition"
                    />
                </label>}
            <label className="relative flex flex-col gap-2 text-sm text-[#F8F5F0]/80">
                Password
                <input
                    value={form.password}
                    onChange={handleChange}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="rounded-2xl bg-[#151515]/80 border border-white/10 px-4 py-3 pr-12 text-sm text-[#F8F5F0] placeholder:text-[#F8F5F0]/40 focus:border-[#D6B98C]/70 focus:outline-none focus:ring-2 focus:ring-[#D6B98C]/15 transition"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 bottom-3.5 text-[#F8F5F0]/50 hover:text-[#F8F5F0]/80 cursor-pointer transition focus:outline-none"
                >
                    {showPassword ? <EyeIcon size={16} /> : <EyeClosed size={16} />}
                </button>
            </label>

            {page === 'signup' && (
                <>
                    <label className="flex flex-col gap-2 text-sm text-[#F8F5F0]/80">
                        Confirm password
                        <input
                            value={form.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            type="password"
                            placeholder="Repeat your password"
                            className="rounded-2xl bg-[#151515]/80 border border-white/10 px-4 py-3 text-sm text-[#F8F5F0] placeholder:text-[#F8F5F0]/40 focus:border-[#D6B98C]/70 focus:outline-none focus:ring-2 focus:ring-[#D6B98C]/15 transition"
                        />
                    </label>

                    {!passMatch && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                    )}
                </>
            )}
            {
                credError && <p className="text-xs text-red-500 mt-1">{credError}</p>
            }
            <button
                type="submit"
                disabled={isSubmitting || (page === 'login' ? !signInLoaded : !signUpLoaded)}
                className="w-full rounded-3xl bg-[#D6B98C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#c9b06d] shadow-[0_20px_50px_rgba(214,185,140,0.18)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting
                    ? (page === 'login' ? 'Signing in...' : 'Creating account...')
                    : (page === 'login' ? 'Sign in' : 'Create account')}
            </button>
        </>
    )

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#0B0B0B] text-[#F8F5F0]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,185,140,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_25%)] pointer-events-none" />

            <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
                <div className="relative w-full overflow-hidden rounded-[40px] border border-white/10 bg-[#131212]/95 shadow-[0_45px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                    <div className="absolute -left-20 top-4 h-40 w-40 rounded-full bg-[#D6B98C]/10 blur-3xl" />
                    <div className="absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-[#F8F5F0]/5 blur-3xl" />

                    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
                        <div className="relative flex items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(214,185,140,0.18),transparent_35%),linear-gradient(180deg,#160f0d_0%,#0b0b0b_100%)] px-8 py-10 sm:px-12 sm:py-16">
                            <div className="relative z-10 max-w-xl text-center lg:text-left">
                                <p className="text-sm uppercase tracking-[0.35em] text-[#D6B98C]/70">Premium watch club</p>
                                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#F8F5F0] sm:text-5xl">
                                    {page === 'login' ? 'Welcome back' : 'Join watch enthusiasts'}
                                </h1>
                                <p className="mt-5 max-w-xl text-sm leading-7 text-[#F8F5F0]/70 sm:text-base">
                                    {page === 'login'
                                        ? 'Sign in to manage your collection, explore the latest releases, and unlock member-only drops.'
                                        : 'Create your account to save favorite styles, get early access to new arrivals, and stay in the loop.'}
                                </p>
                                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-3xl border border-white/10 bg-[#1A1714]/80 p-4 text-left">
                                        <p className="text-xs uppercase tracking-[0.25em] text-[#F8F5F0]/50">Fast checkout</p>
                                        <p className="mt-2 text-sm text-[#F8F5F0]/80">Secure sign-in in seconds.</p>
                                    </div>
                                    <div className="rounded-3xl border border-white/10 bg-[#1A1714]/80 p-4 text-left">
                                        <p className="text-xs uppercase tracking-[0.25em] text-[#F8F5F0]/50">Exclusive drops</p>
                                        <p className="mt-2 text-sm text-[#F8F5F0]/80">Get first access to limited editions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative px-8 py-10 sm:px-12 sm:py-14">
                            <div className="mx-auto max-w-md">
                                <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#111111]/90 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                                    <button
                                        type="button"
                                        className={`flex-1 rounded-full py-3 text-sm font-semibold transition ${page === 'login'
                                            ? 'bg-[#F8F5F0] text-[#0B0B0B] shadow-[0_10px_30px_rgba(248,245,240,0.16)]'
                                            : 'text-[#F8F5F0]/70 hover:text-[#F8F5F0]'
                                            }`}
                                        onClick={() => setPage('login')}
                                    >
                                        Sign in
                                    </button>
                                    <button
                                        type="button"
                                        className={`flex-1 rounded-full py-3 text-sm font-semibold transition ${page === 'signup'
                                            ? 'bg-[#F8F5F0] text-[#0B0B0B] shadow-[0_10px_30px_rgba(248,245,240,0.16)]'
                                            : 'text-[#F8F5F0]/70 hover:text-[#F8F5F0]'
                                            }`}
                                        onClick={() => setPage('signup')}
                                    >
                                        Sign up
                                    </button>
                                </div>

                                <div className="mt-8 space-y-6">
                                    <button
                                        type="button"
                                        disabled={!signInLoaded}
                                        className="flex w-full items-center justify-center gap-3 rounded-3xl border border-white/10 bg-[#111111]/90 px-4 py-3 text-sm text-[#F8F5F0] transition hover:border-[#D6B98C]/40 hover:bg-[#171413] disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={async () => {
                                            try {
                                                if (!signInLoaded) return;

                                                await googleLogin(signIn);
                                            } catch (err) {
                                                setCredError(getErrorMessage(err));
                                            }
                                        }}
                                    >
                                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#0B0B0B] text-lg">G</span>
                                        Continue with Google
                                    </button>

                                    <div className="relative text-center text-xs uppercase tracking-[0.3em] text-[#F8F5F0]/40">
                                        <span className="bg-[#0B0B0B] px-3">or</span>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">{formFields}</form>

                                    <p className="pt-3 text-center text-sm text-[#F8F5F0]/60">
                                        {page === 'login' ? 'New here?' : 'Already have an account?'}{' '}
                                        <button type="button" className="font-semibold text-[#D6B98C] transition hover:text-[#F8F5F0]" onClick={() => setPage(page === 'login' ? 'signup' : 'login')}>
                                            {page === 'login' ? 'Create account' : 'Sign in'}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AuthPage