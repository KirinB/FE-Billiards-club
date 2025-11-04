export const MESSAGES = {
  VALIDATION: {
    REQUIRED: "This field is required.",
    USERNAME_OR_EMAIL_LENGTH: "Tên đăng nhập hoặc email phải hơn 3 ký tự",
    INVALID_FORMAT: "Invalid format.",
    PASSWORD_SECURITY:
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
    PASSWORD_LENGTH: "Mật khẩu ít nhất 6 ký tự",
    PASSWORD_MATCH: "Passwords do not match.",
    INVALID_URL: "Invalid URL format.",
    PHONE_LENGTH: "Phone number must have at least 10 digits.",
    MIN_ROLL_SCHEDULE_REQUIRED: "Minimum roll schedule must be greater than 0.",
    INVALID_PHONE_NUMBER: "Invalid phone number format.",
    INVALID_ZIP_CODE: "ZIP code must be less than 10 characters.",
    INVALID_EMAIL: "Invalid email format.",
    INVALID_OTP: "Invalid OTP.",
    EMAIL_NOT_AVAILABLE: "Your email is not available.",
    MUST_BE_POSITIVE: "Value must be greater than 0.",
    INVALID_DATE: "Invalid date format.",
    PHONE_VN: "Phone number is not in a valid Vietnamese format.",
  },
  STREAM: {
    FORBIDDEN_ERROR: "Request failed with status code 403.",
  },
  AUTH: {
    INVALID_CREDENTIALS: "Invalid email, username or password.",
    API_INVALID_ERROR_MESSAGE: "Authentication failed, user not found.",
    API2_INVALID_ERROR_MESSAGE: "Authentication failed, incorrect password.",
  },
};
