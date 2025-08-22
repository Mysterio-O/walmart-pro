'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/actions/auth/registerUser';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        // Clear success message when user makes changes
        if (successMessage) {
            setSuccessMessage('');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

         const userData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                }

        console.log('Form data being sent:', formData);

        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');

        const response = await registerUser(userData);
        console.log(response);
        setIsLoading(false);
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-8">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-primary">Create WalmartPro Account</h2>
                        <p className="text-base-content/70 mt-2">Join thousands of professionals using WalmartPro</p>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="alert alert-success mb-4">
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {errors.submit && (
                        <div className="alert alert-error mb-4">
                            <span>{errors.submit}</span>
                        </div>
                    )}

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="John"
                                    className={`input input-bordered hover:bg-gray-100 focus:input-black w-full ${errors.firstName ? 'input-error' : ''
                                        }`}
                                    disabled={isLoading}
                                />
                                {errors.firstName && (
                                    <span className="text-error text-xs mt-1">{errors.firstName}</span>
                                )}
                            </div>

                            <div className="form-control">
                                <label htmlFor="lastName" className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Doe"
                                    className={`input input-bordered hover:bg-gray-100 focus:input-black w-full ${errors.lastName ? 'input-error' : ''
                                        }`}
                                    disabled={isLoading}
                                />
                                {errors.lastName && (
                                    <span className="text-error text-xs mt-1">{errors.lastName}</span>
                                )}
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
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john.doe@company.com"
                                className={`input input-bordered hover:bg-gray-100 focus:input-black w-full ${errors.email ? 'input-error' : ''
                                    }`}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <span className="text-error text-xs mt-1">{errors.email}</span>
                            )}
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
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Create a strong password (min. 8 characters)"
                                className={`input input-bordered hover:bg-gray-100 focus:input-black w-full ${errors.password ? 'input-error' : ''
                                    }`}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <span className="text-error text-xs mt-1">{errors.password}</span>
                            )}
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
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm your password"
                                className={`input input-bordered hover:bg-gray-100 focus:input-black w-full ${errors.confirmPassword ? 'input-error' : ''
                                    }`}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <span className="text-error text-xs mt-1">{errors.confirmPassword}</span>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-3">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="checkbox checkbox-primary"
                                    disabled={isLoading}
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
                            {errors.agreeToTerms && (
                                <span className="text-error text-xs mt-1 ml-9">{errors.agreeToTerms}</span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn bg-white text-black hover:bg-gray-100 btn-block"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider my-6">OR</div>

                    {/* Social Signup Options */}
                    <div className="space-y-3">
                        <button
                            className="btn bg-white text-black hover:bg-gray-100 btn-block btn-outline outline-black"
                            disabled={isLoading}
                        >
                            <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path fill="black" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path>
                            </svg>
                            Sign up with Facebook
                        </button>

                        <button
                            className="btn bg-white text-black hover:bg-gray-100 btn-block btn-outline outline-black"
                            disabled={isLoading}
                        >
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <g>
                                    <path d="m0 0H512V512H0" fill="#fff"></path>
                                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                </g>
                            </svg>
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
    );
}