# Future Work

## Email Form Security & Anti-Spam Enhancements
*Date Added: June 12, 2026*

The current contact form has basic bot protection using a client-side honeypot field. For production deployment and enhanced security, the following measures should be implemented:

### 1. EmailJS Origin Domain Restriction
- **Task:** Restrict API calls to only originate from the official domain.
- **Implementation:** 
  1. Go to the EmailJS dashboard.
  2. Navigate to **Account** -> **Security**.
  3. Under **Allowed Domains / Origins**, add:
     - `http://localhost:3000` (for local development)
     - `https://your-production-domain.com` (for production)

### 2. EmailJS Rate Limiting
- **Task:** Prevent abuse by limit-throttling requests.
- **Implementation:** Enable rate-limiting rules in the EmailJS dashboard settings to allow a maximum number of submissions per hour/day from a single IP address.

### 3. Google reCAPTCHA or hCaptcha Integration
- **Task:** Add CAPTCHA verification to form submission to block advanced automated spam.
- **Implementation:**
  - Register the site on Google reCAPTCHA.
  - Install the client-side reCAPTCHA React library.
  - Require a validation token on form submission to verify human presence before forwarding to the EmailJS API.
