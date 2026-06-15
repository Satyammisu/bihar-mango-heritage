/**
 * Bihar Smart Mango Knowledge Wall - Centralized Horticultural Database
 * Architecture: Normalized Master-Detail Relationship
 * Calibrated: 2026 Lab Metrics & Centralized Commercial Benchmarks
 */

const BENCHMARK_VARIETIES = [
  { "name": "Alphonso", "tss": "20.0–22.0", "tssMid": 21.0, "gi": 56 },
  { "name": "Kesar", "tss": "19.0–21.0", "tssMid": 20.0, "gi": 53 },
  { "name": "Dashehari", "tss": "18.0–20.0", "tssMid": 19.0, "gi": 54 },
  { "name": "Totapuri", "tss": "15.0–17.0", "tssMid": 16.0, "gi": 51 }
];

const MANGO_MASTER_DATA = {
  "dudhiyamaldah": {
    "id": "dudhiyamaldah",
    "image": "./images/dudhiyamaldah.jpg",
    "qrCode": "./qr/dudhiyamaldah-qr.png",
    "selfMetrics": { "name": "Dudhiya Maldah", "tss": "20.5–22.0", "tssMid": 21.25, "gi": 51 }
  },
  "bombai": {
    "id": "bombai",
    "image": "./images/bombai.jpg",
    "qrCode": "./qr/bombai-qr.png",
    "selfMetrics": { "name": "Bombai", "tss": "18.0–19.0", "tssMid": 18.5, "gi": 55 }
  },
  "jardalu": {
    "id": "jardalu",
    "image": "./images/zardalu.jpg",
    "qrCode": "./qr/zardalu-qr.png",
    "selfMetrics": { "name": "Jardalu", "tss": "19.5–21.0", "tssMid": 20.25, "gi": 45 }
  },
  "langra": {
    "id": "langra",
    "image": "./images/langra.jpg",
    "qrCode": "./qr/langra-qr.png",
    "selfMetrics": { "name": "Langra", "tss": "21.0–22.0", "tssMid": 21.5, "gi": 54 }
  },
  "chausa": {
    "id": "chausa",
    "image": "./images/chausa.jpg",
    "qrCode": "./qr/chausa-qr.png",
    "selfMetrics": { "name": "Chausa", "tss": "21.5–23.0", "tssMid": 22.25, "gi": 55 }
  },
  "amrapali": {
    "id": "amrapali",
    "image": "./images/amrapali.jpg",
    "qrCode": "./qr/amrapali-qr.png",
    "selfMetrics": { "name": "Amrapali", "tss": "20.5–22.0", "tssMid": 21.25, "gi": 54 }
  },
  "gulabkhas": {
    "id": "gulabkhas",
    "image": "./images/gulabkhas.jpg",
    "qrCode": "./qr/gulabkhas-qr.png",
    "selfMetrics": { "name": "Gulabkhas", "tss": "19.0–20.5", "tssMid": 19.75, "gi": 50 }
  },
  "maldah": {
    "id": "maldah",
    "image": "./images/dudhiyamaldah.jpg",
    "qrCode": "./qr/dudhiyamaldah-qr.png",
    "selfMetrics": { "name": "Maldah", "tss": "20.0–21.5", "tssMid": 20.75, "gi": 51 }
  },
  "sipahiya": {
    "id": "sipahiya",
    "image": "./images/sipahiya.jpg",
    "qrCode": "./qr/sipahiya-qr.png",
    "selfMetrics": { "name": "Sipahiya", "tss": "17.5–18.5", "tssMid": 18.0, "gi": 52 }
  },
  "sukul": {
    "id": "sukul",
    "image": "./images/sukul.jpg",
    "qrCode": "./qr/sukul-qr.png",
    "selfMetrics": { "name": "Sukul", "tss": "18.5–19.5", "tssMid": 19.0, "gi": 52 }
  },
  "krishnabhog": {
    "id": "krishnabhog",
    "image": "./images/krishnabhog.jpg",
    "qrCode": "./qr/krishnabhog-qr.png",
    "selfMetrics": { "name": "Krishna Bhog", "tss": "19.0–20.5", "tssMid": 19.75, "gi": 55 }
  },
  "kalkatiya": {
    "id": "kalkatiya",
    "image": "./images/kalkatiya.jpg",
    "qrCode": "./qr/kalkatiya-qr.png",
    "selfMetrics": { "name": "Kalkatiya", "tss": "18.0–19.5", "tssMid": 18.75, "gi": 52 }
  }
};

Object.freeze(BENCHMARK_VARIETIES);
Object.freeze(MANGO_MASTER_DATA);
