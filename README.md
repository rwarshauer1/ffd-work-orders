[README.md](https://github.com/user-attachments/files/26857067/README.md)
# FD Work Orders

A free, open-source work order management system for fire departments and emergency services. Built as a progressive web app (PWA) — members install it on their phone like a real app, no app store required.

## Features

- Work order submission with automatic officer notification (email + SMS)
- Admin dashboard with password-protected officer logins
- Member status viewer — look up any work order by number or badge
- Audit trail — full change history on every work order
- Gear wash request with pre-submission checklist
- Request access flow for new admin users
- Real-time updates via Firebase
- Installable on iPhone and Android home screens
- Beta labeling and bug reporting built in

## Tech Stack

| Layer | Service | Cost |
|-------|---------|------|
| Hosting | Netlify | Free |
| Database | Firebase Firestore | Free |
| Authentication | Firebase Auth | Free |
| Email notifications | EmailJS | Free (200/mo) |
| SMS notifications | Twilio | ~$2-3/mo |

---

## Setup Guide

### Step 1 — Firebase

1. Go to [firebase.google.com](https://firebase.google.com) and create a new project
2. Enable **Firestore Database** (start in test mode)
3. Enable **Authentication → Email/Password**
4. Go to Project Settings → Add a web app → copy your config keys

### Step 2 — EmailJS

1. Go to [emailjs.com](https://emailjs.com) and create a free account
2. Connect your Gmail or email account as a service
3. Create an email template with these variables:
   - `{{wo_id}}` — work order number
   - `{{submitter_name}}` — who submitted
   - `{{badge}}` — badge number
   - `{{type}}` — work order type
   - `{{officer}}` — assigned officer
   - `{{date}}` — submission date
   - `{{issue}}` — issue description
   - `{{to_email}}` — recipient (set as To Email field)
4. Copy your Service ID, Template ID, and Public Key

### Step 3 — Twilio (optional, for SMS)

1. Go to [twilio.com](https://twilio.com) and create an account
2. Get a phone number
3. Complete A2P 10DLC or toll-free verification for US SMS
4. Copy your Account SID, Auth Token, and phone number

### Step 4 — Configure your department

Edit `config.js` with your department's information:
- Department name and short name
- Member access code
- Badge number validation prefixes
- Rig/apparatus list
- Officer notification routing
- Vendor list
- Reassignment officer list

### Step 5 — Set up Firebase data

1. In Firestore, create a `settings` collection
2. Add a `config` document with:
   - `memberCode` (string): your member access code
   - `adminPassword` (string): your admin password
3. Add an `officers` document with each officer as a map field:
   ```
   username: {
     name: "Display Name",
     email: "email@example.com",
     phone: "+1XXXXXXXXXX",
     mustChangePassword: true
   }
   ```

### Step 6 — Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and create a free account
2. Drag your project folder to [netlify.com/drop](https://netlify.com/drop)
3. Add these environment variables in Netlify (Project Configuration → Environment Variables):
   - `TWILIO_SID` — your Twilio Account SID
   - `TWILIO_TOKEN` — your Twilio Auth Token
   - `TWILIO_FROM` — your Twilio phone number
   - `SECRETS_SCAN_SMART_DETECTION_ENABLED` — `false`
4. Add your Firebase config to `index.html` (search for `firebase.initializeApp`)
5. Add your EmailJS public key to `index.html` (search for `emailjs.init`)

### Step 7 — Create officer accounts

1. Go to Firebase → Authentication → Users
2. Add each officer with email: `username@yourdept.internal` and password: `welcome123`
3. Officers will be prompted to set their own password on first login

### Step 8 — Generate QR code

1. Go to [goqr.me](https://goqr.me)
2. Enter your Netlify URL
3. Download the static QR code
4. Print and post at your station

---

## Customization

### Adding a new officer
1. Firebase → Authentication → Add user (`username@yourdept.internal`, `welcome123`)
2. Firebase → Firestore → settings → officers → Add field (map with name, email, phone)

### Changing passwords
- Member access code: Firebase → settings → config → memberCode
- Admin password: No longer used (individual logins via Firebase Auth)

### Adding new rigs
Edit the `rigs` array in `config.js` and redeploy

### Updating notification routing
Edit the `getOfficerAssignment` function in `config.js`

---

## License

MIT — free to use, modify, and distribute. Attribution appreciated but not required.

---

## Created by

Robert Warshauer — built for the Farmingdale Fire Department, Long Island, NY.
