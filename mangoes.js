/**
 * Bihar Smart Mango Knowledge Wall - Master Application Structural Config
 * Source of Truth: Structural asset relative paths, ID tokens, and laboratory metrics.
 * Decoupled from translation strings to safeguard asset loads on GitHub Pages.
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
    "id": "jardalu",
    "image": "./images/zardalu.jpg", // Pointing directly to your zardalu.jpg asset
    "qrCode": "./qr/zardalu-qr.png",  // Pointing directly to your zardalu-qr.png asset
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
    "image": "./images/dudhiyamaldah.jpg", // Redirected to your valid repository asset file
    "qrCode": "./qr/dudhiyamaldah-qr.png",
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

// Protect properties from inadvertent script modifications
Object.freeze(MANGO_MASTER_DATA);
