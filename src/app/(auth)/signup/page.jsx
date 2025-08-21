import React from 'react'
import Link from 'next/link'

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-8">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-primary">Create WalmartPro Account</h2>
                        <p className="text-base-content/70 mt-2">Join thousands of professionals using WalmartPro</p>
                    </div>

                    {/* Signup Form */}
                    <form className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label htmlFor="firstName" className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                    className="input input-bordered hover:bg-gray-100 focus:input-black w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label htmlFor="lastName" className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                    className="input input-bordered hover:bg-gray-100 focus:input-black w-full"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label htmlFor="emailInput" className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <input
                                type="email"
                                id="emailInput"
                                name="email"
                                placeholder="john.doe@company.com"
                                className="input input-bordered hover:bg-gray-100 focus:input-black w-full"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label htmlFor="passwordInput" className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="passwordInput"
                                name="password"
                                placeholder="Create a strong password"
                                className="input input-bordered hover:bg-gray-100 focus:input-black w-full"
                                required
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-control">
                            <label htmlFor="confirmPassword" className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className="input input-bordered hover:bg-gray-100 focus:input-black w-full"
                                required
                            />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-3">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    required
                                />
                                <span className="label-text text-sm">
                                    I agree to the{' '}
                                    <Link href="/terms" className="link link-primary">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" className="link link-primary">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-white text-black hover:bg-gray-100 btn-block">
                                Create Account
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider my-6">OR</div>

                    {/* Social Signup Options */}
                    <div className="space-y-3">
                        <button className="btn bg-white text-black hover:bg-gray-100 btn-block btn-outline outline-black">
                            <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="black" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
                            Sign up with Facebook
                        </button>

                        <button className="btn bg-white text-black hover:bg-gray-100 btn-block btn-outline outline-black">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Sign up with Google
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-base-content/70">
                            Already have an account?{' '}
                            <Link href="/login" className="link link-primary font-semibold">
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Footer Notice */}
                    <div className="text-xs text-base-content/50 text-center mt-4">
                        By creating an account, you agree to our Terms of Service and Privacy Policy.
                    </div>
                </div>
            </div>
        </div>
    )
}