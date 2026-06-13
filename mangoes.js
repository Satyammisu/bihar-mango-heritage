/**
 * Bihar Smart Mango Knowledge Wall - Master Application Structural Config
 * Source of Truth: Structural asset relative paths, ID tokens, and laboratory metrics.
 * * NOTE: Text translations are decoupled from this file and stored in lang/*.json.
 * Relative path dot notation './' is used to safeguard deployment on GitHub Pages.
 */

const MANGO_MASTER_DATA = {
  "dudhiyamaldah": {
    "id": "dudhiyamaldah",
    "image": "./images/dudhiyamaldah.jpg",
    "qrCode": "./qrcodes/dudhiyamaldah.png",
    "metrics": {
      "tss": 21.0,
      "gi": 49.0
    }
  },
  "bombai": {
    "id": "bombai",
    "image": "./images/bombai.jpg",
    "qrCode": "./qrcodes/bombai.png",
    "metrics": {
      "tss": 18.5,
      "gi": 52.0
    }
  },
  "jardalu": {
    "id": "jardalu",
    "image": "./images/jardalu.jpg",
    "qrCode": "./qrcodes/jardalu.png",
    "metrics": {
      "tss": 20.2,
      "gi": 50.0
    }
  },
  "langra": {
    "id": "langra",
    "image": "./images/langra.jpg",
    "qrCode": "./qrcodes/langra.png",
    "metrics": {
      "tss": 21.5,
      "gi": 48.0
    }
  },
  "chausa": {
    "id": "chausa",
    "image": "./images/chausa.jpg",
    "qrCode": "./qrcodes/chausa.png",
    "metrics": {
      "tss": 22.0,
      "gi": 47.0
    }
  },
  "amrapali": {
    "id": "amrapali",
    "image": "./images/amrapali.jpg",
    "qrCode": "./qrcodes/amrapali.png",
    "metrics": {
      "tss": 21.2,
      "gi": 46.0
    }
  },
  "fazli": {
    "id": "fazli",
    "image": "./images/fazli.jpg",
    "qrCode": "./qrcodes/fazli.png",
    "metrics": {
      "tss": 17.0,
      "gi": 55.0
    }
  },
  "gulabkhas": {
    "id": "gulabkhas",
    "image": "./images/gulabkhas.jpg",
    "qrCode": "./qrcodes/gulabkhas.png",
    "metrics": {
      "tss": 19.8,
      "gi": 51.0
    }
  },
  "maldah": {
    "id": "maldah",
    "image": "./images/maldah.jpg",
    "qrCode": "./qrcodes/maldah.png",
    "metrics": {
      "tss": 20.8,
      "gi": 49.5
    }
  },
  "sipahiya": {
    "id": "sipahiya",
    "image": "./images/sipahiya.jpg",
    "qrCode": "./qrcodes/sipahiya.png",
    "metrics": {
      "tss": 18.0,
      "gi": 53.0
    }
  },
  "sukul": {
    "id": "sukul",
    "image": "./images/sukul.jpg",
    "qrCode": "./qrcodes/sukul.png",
    "metrics": {
      "tss": 19.0,
      "gi": 52.5
    }
  }
};

// Freeze the object to prevent accidental runtime modifications by other kiosk script mutations
Object.freeze(MANGO_MASTER_DATA);