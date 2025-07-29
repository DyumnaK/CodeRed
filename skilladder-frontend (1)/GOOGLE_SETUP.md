# Google OAuth Setup Guide

Follow these steps to set up Google OAuth for SkillLadder:

## 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "SkillLadder"
4. Click "Create"

## 2. Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## 3. Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "SkillLadder"
   - User support email: your email
   - Developer contact information: your email
4. Click "Save and Continue"
5. Skip "Scopes" for now
6. Add test users (your email) if needed
7. Click "Save and Continue"

## 4. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Name: "SkillLadder Web Client"
5. Add Authorized JavaScript origins:
   - `http://localhost:3000`
   - `https://yourdomain.com` (for production)
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Click "Create"

## 5. Copy Credentials

1. Copy the "Client ID" and "Client Secret"
2. Add them to your `.env.local` file:

\`\`\`env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000
\`\`\`

## 6. Generate NextAuth Secret

Run this command to generate a secure secret:

\`\`\`bash
openssl rand -base64 32
\`\`\`

Or use this online generator: https://generate-secret.vercel.app/32

## 7. Test the Integration

1. Restart your development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Continue with Google"
4. You should be redirected to Google's OAuth flow

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**
   - Make sure your redirect URI exactly matches what's in Google Console
   - Check for trailing slashes or http vs https

2. **"invalid_client" error**
   - Verify your Client ID and Secret are correct
   - Make sure there are no extra spaces in your .env file

3. **"access_blocked" error**
   - Your app needs to be verified by Google for production use
   - For development, add your email as a test user

### Development vs Production:

**Development:**
- Use `http://localhost:3000` for origins and redirects
- Add test users in OAuth consent screen

**Production:**
- Use your actual domain with HTTPS
- Complete Google's app verification process
- Update environment variables with production URLs

## Security Notes:

- Never commit your `.env.local` file to version control
- Use different credentials for development and production
- Regularly rotate your NextAuth secret
- Monitor your Google Cloud Console for unusual activity
