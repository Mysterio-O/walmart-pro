import React from 'react'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-8">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-primary">Login to WalmartPro</h2>
                        <p className="text-base-content/70 mt-2">Enter your credentials to access your account</p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-4">
                        {/* Email Field */}
                        <div className="form-control">
                            <label htmlFor="emailInput" className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <input
                                type="email"
                                id="emailInput"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered hover:bg-gray-100 focus:input-black w-full"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label htmlFor="passwordInput" className="label">
                                <span className="label-text">Password</span>
                                <Link href="/forgot-password" className="label-text-alt link link-primary">
                                    Forgot password?
                                </Link>
                            </label>
                            <input
                                type="password"
                                id="passwordInput"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered hover:bg-gray-100 focus:input-black w-full"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-white text-black hover:bg-gray-100 btn-block">
                                Sign In
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider my-6">OR</div>

                    {/* Social Login Options */}
                    <div className="space-y-3">
                        <button className="btn bg-white text-black hover:bg-gray-100 btn-block btn-outline outline-black">
                            <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
                            Login with Facebook
                        </button>

                        <button className="btn bg-white text-black hover:bg-gray-100 btn-block btn-outline outline-black">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <p className="text-base-content/70">
                            Don't have an account?{' '}
                            <Link href="/signup" className="link link-primary font-semibold">
                                Sign up here
                            </Link>
                        </p>
                    </div>

                    {/* Footer Notice */}
                    <div className="text-xs text-base-content/50 text-center mt-4">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </div>
                </div>
            </div>
        </div>
    )
}