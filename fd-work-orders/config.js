/**
 * FD Work Orders — Department Configuration
 * ==========================================
 * Fill in all values below before deploying.
 * This is the only file you need to edit for basic setup.
 */

const DEPARTMENT_CONFIG = {

  // ─── DEPARTMENT INFO ───────────────────────────────────────────
  name: "Your Fire Department",           // Full department name
  shortName: "FD",                        // Short name (shown in header, e.g. "FFD")
  location: "Your Town, State",           // Location shown in footer
  appUrl: "https://your-site.netlify.app",// Your Netlify URL after deploying

  // ─── ACCESS CODES ──────────────────────────────────────────────
  memberCode: "CHANGE_ME",               // Code members enter to access the app
  // Admin passwords are managed via Firebase Authentication (see README)

  // ─── BADGE VALIDATION ──────────────────────────────────────────
  // First two digits that are valid for full members
  validBadgePrefixes: ["30", "31", "60", "61"],
  // First two digits for junior/probationary members (blocked from submitting)
  juniorBadgePrefixes: ["50", "51", "52", "53", "54", "55"],

  // ─── RIGS / APPARATUS ──────────────────────────────────────────
  rigs: [
    "Engine 1", "Engine 2", "Ladder 1", "Rescue 1", "Chief 1"
    // Add or remove rigs as needed
  ],

  // ─── WORK ORDER TYPES ──────────────────────────────────────────
  // You can customize subtypes but keep the primary type keys the same
  primaryTypes: {
    "apparatus-equip": "On Apparatus Equipment",
    "apparatus-rig":   "Apparatus Issue",
    "station":         "Station Issue",
    "scba":            "SCBA",
    "ff":              "Firefighter Request",
    "radio":           "Radio Issue"
  },

  stationSubtypes: ["Station Equipment", "Building Issue"],
  ffSubtypes: ["Gear Issue", "Pager Issue", "Technology Issue", "Gear Wash Request"],

  // ─── VENDORS ───────────────────────────────────────────────────
  vendors: [
    "Vendor 1", "Vendor 2", "Vendor 3", "Other"
    // Add your department's regular vendors
  ],

  // ─── OFFICERS & NOTIFICATION ROUTING ──────────────────────────
  // Map officer display names to their contact info
  // These are loaded from Firebase Firestore (settings/officers)
  // but you can also hardcode them here as a fallback

  // ─── NOTIFICATION ROUTING ──────────────────────────────────────
  // Define who gets notified for each work order type
  // Returns { assigned: "Officer Name", notifyAll: ["Officer1", "Officer2"] }
  getOfficerAssignment: function(primary, sub, badge, badgeFirst) {
    // CUSTOMIZE THIS ROUTING FOR YOUR DEPARTMENT
    // Example structure — replace with your actual officers

    if (primary === 'scba') {
      return { assigned: 'SCBA Officer', notifyAll: ['SCBA Officer'] };
    }

    if (primary === 'radio') {
      return { assigned: 'Radio Officer', notifyAll: ['Radio Officer'] };
    }

    if (primary === 'apparatus-equip' || primary === 'apparatus-rig') {
      // Add rig-based routing here
      return { assigned: 'Apparatus Officer', notifyAll: ['Apparatus Officer'] };
    }

    if (primary === 'station') {
      if (sub === 'Station Equipment') return { assigned: 'Station Officer', notifyAll: ['Station Officer'] };
      if (sub === 'Building Issue') return { assigned: 'Building Officer', notifyAll: ['Building Officer'] };
    }

    if (primary === 'ff') {
      if (sub === 'Pager Issue') return { assigned: 'Pager Officer', notifyAll: ['Pager Officer'] };
      if (sub === 'Technology Issue') return { assigned: 'Tech Officer', notifyAll: ['Tech Officer'] };
      if (sub === 'Gear Issue') return { assigned: 'Gear Officer', notifyAll: ['Gear Officer'] };
      if (sub === 'Gear Wash Request') return { assigned: 'Gear Wash Officer', notifyAll: ['Gear Wash Officer'] };
    }

    return { assigned: 'Officer TBD', notifyAll: ['Officer TBD'] };
  },

  // ─── REASSIGNABLE OFFICERS ─────────────────────────────────────
  // List of officers who can be reassigned work orders
  reassignList: [
    "Officer 1", "Officer 2", "Officer 3"
    // Add your officers here
  ],

  // ─── CONTACT INFO ──────────────────────────────────────────────
  // System administrator shown on forgot password screen
  sysAdmin: "Your Name",

  // ─── VERSION ───────────────────────────────────────────────────
  version: "Beta v1.0.0",

};
