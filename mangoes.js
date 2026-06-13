/**
 * Bihar Smart Mango Knowledge Wall - Master Application Structural Config
 * Source of Truth: Structural asset relative paths, ID tokens, and laboratory metrics.
 * * FIXES APPLIED:
 * 1. Diverted path directory from './qrcodes/' to './qr/'
 * 2. Appended the '-qr.png' suffix to match the physical repository asset names.
 * 3. Resolved 'jardalu' assets to point directly to 'zardalu.jpg' and 'zardalu-qr.png'.
 */

const MANGO_MASTER_DATA = {
  "dudhiyamaldah": {
    "id": "dudhiyamaldah",
    "image": "./images/dudhiyamaldah.jpg",
    "qrCode": "./qr/dudhiyamaldah-qr.png",
    "metrics": { "tss": 21.0, "gi": 49.0 }
  },
  "bombai": {
    "id": "bombai",
    "image": "./images/bombai.jpg",
    "qrCode": "./qr/bombai-qr.png",
    "metrics": { "tss": 18.5, "gi": 52.0 }
  },
  "jardalu": {
    "id": "jardalu", // Keep the programmatic ID key consistent with your translation JSON keys
    "image": "./images/zardalu.jpg", // Corrected to match your physical filename
    "qrCode": "./qr/zardalu-qr.png", // Corrected directory, spelling, and suffix
    "metrics": { "tss": 20.2, "gi": 50.0 }
  },
  "langra": {
    "id": "langra",
    "image": "./images/langra.jpg",
    "qrCode": "./qr/langra-qr.png",
    "metrics": { "tss": 21.5, "gi": 48.0 }
  },
  "chausa": {
    "id": "chausa",
    "image": "./images/chausa.jpg",
    "qrCode": "./qr/chausa-qr.png",
    "metrics": { "tss": 22.0, "gi": 47.0 }
  },
  "amrapali": {
    "id": "amrapali",
    "image": "./images/amrapali.jpg",
    "qrCode": "./qr/amrapali-qr.png",
    "metrics": { "tss": 21.2, "gi": 46.0 }
  },
  "fazli": {
    "id": "fazli",
    "image": "./images/fazli.jpg",
    "qrCode": "./qr/fazli-qr.png",
    "metrics": { "tss": 17.0, "gi": 55.0 }
  },
  "gulabkhas": {
    "id": "gulabkhas",
    "image": "./images/gulabkhas.jpg",
    "qrCode": "./qr/gulabkhas-qr.png",
    "metrics": { "tss": 19.8, "gi": 51.0 }
  },
  "maldah": {
    "id": "maldah",
    "image": "./images/maldah.jpg",
    "qrCode": "./qr/maldah-qr.png",
    "metrics": { "tss": 20.8, "gi": 49.5 }
  },
  "sipahiya": {
    "id": "sipahiya",
    "image": "./images/sipahiya.jpg",
    "qrCode": "./qr/sipahiya-qr.png",
    "metrics": { "tss": 18.0, "gi": 53.0 }
  },
  "sukul": {
    "id": "sukul",
    "image": "./images/sukul.jpg",
    "qrCode": "./qr/sukul-qr.png",
    "metrics": { "tss": 19.0, "gi": 52.5 }
  }
};

// Freeze the object to protect structural matrix properties at runtime
Object.freeze(MANGO_MASTER_DATA);
