import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";
    return { success: false, error: errorMessage };
  }
}

export async function registerUser(name, email, password, registrationID) {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/register`, {
      name,
      email,
      password,
      registrationID,
    });
    console.log(API_BASE_URL);

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Registration failed";
    return { success: false, error: errorMessage };
  }
}

export async function verifyOTP(email, otp) {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/verify-email`, {
      email,
      otp,
    });

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "OTP verification failed";
    return { success: false, error: errorMessage };
  }
}

export async function resendOTP(email) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register/resend`, {
      email,
    });

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to resend OTP";
    return { success: false, error: errorMessage };
  }
}

export function getRoleBasedRedirect(role) {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return "/admin";
    case "PARTICIPANT":
      return "/profile";
    case "MEMBER":
      return "/member";
    default:
      return "/";
  }
}
