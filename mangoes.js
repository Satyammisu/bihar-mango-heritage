const MANGO_MASTER_DATA = {
    "dudhiyamaldah": {
        "selfMetrics": { "name": "Dudhiya Maldah", "tss": "20.0-21.0", "tssMid": 20.5, "gi": 51 },
        "image": "img/dudhiyamaldah.png",
        "qrCode": "./qr/dudhiyamaldah-qr.png"
    },
    "zardalu": {
        "selfMetrics": { "name": "Jardalu", "tss": "21.5-22.5", "tssMid": 22.0, "gi": 48 },
        "image": "img/zardalu.png",
        "qrCode": "./qr/zardalu-qr.png"
    },
    "langra": {
        "selfMetrics": { "name": "Langra", "tss": "18.5-19.5", "tssMid": 19.0, "gi": 55 },
        "image": "img/langra.png",
        "qrCode": "./qr/langra-qr.png"
    },
    "chausa": {
        "selfMetrics": { "name": "Chausa", "tss": "21.0-22.0", "tssMid": 21.5, "gi": 51 },
        "image": "img/chausa.png",
        "qrCode": "./qr/chausa-qr.png"
    },
    "amrapali": {
        "selfMetrics": { "name": "Amrapali", "tss": "18.0-19.0", "tssMid": 18.5, "gi": 54 },
        "image": "img/amrapali.png",
        "qrCode": "./qr/amrapali-qr.png"
    },
    "gulabkhas": {
        "selfMetrics": { "name": "Gulabkhas", "tss": "17.0-18.0", "tssMid": 17.5, "gi": 56 },
        "image": "img/gulabkhas.png",
        "qrCode": "./qr/gulabkhas-qr.png"
    },
    "krishnabhog": {
        "selfMetrics": { "name": "Krishna Bhog", "tss": "19.5-20.5", "tssMid": 20.0, "gi": 50 },
        "image": "img/krishnabhog.png",
        "qrCode": "./qr/krishnabhog-qr.png"
    },
    "bombai": {
        "selfMetrics": { "name": "Bombai", "tss": "16.0-17.0", "tssMid": 16.5, "gi": 58 },
        "image": "img/bombai.png",
        "qrCode": "./qr/bombai-qr.png"
    },
    "sipahiya": {
        "selfMetrics": { "name": "Sipahiya", "tss": "16.5-17.5", "tssMid": 17.0, "gi": 57 },
        "image": "img/sipahiya.png",
        "qrCode": "./qr/sipahiya-qr.png"
    },
    "sukul": {
        "selfMetrics": { "name": "Sukul", "tss": "17.5-18.5", "tssMid": 18.0, "gi": 53 },
        "image": "img/sukul.png",
        "qrCode": "./qr/sukul-qr.png"
    },
    "kalkatiya": {
        "selfMetrics": { "name": "Kalkatiya", "tss": "19.0-20.0", "tssMid": 19.5, "gi": 54 },
        "image": "img/kalkatiya.png",
        "qrCode": "./qr/kalkatiya-qr.png"
    }
};

/**
 * Returns comparison data with added safety checks and full metric inclusion.
 */
function getComparisonData(targetId) {
    const target = MANGO_MASTER_DATA[targetId];
    
    if (!target) {
        console.error("Variety not found:", targetId);
        return [];
    }

    const others = Object.keys(MANGO_MASTER_DATA)
        .filter(id => id !== targetId)
        .map(id => ({
            name: MANGO_MASTER_DATA[id].selfMetrics.name,
            tss: MANGO_MASTER_DATA[id].selfMetrics.tss,
            tssMid: MANGO_MASTER_DATA[id].selfMetrics.tssMid,
            gi: MANGO_MASTER_DATA[id].selfMetrics.gi
        }));

    return [
        {
            name: target.selfMetrics.name,
            tss: target.selfMetrics.tss,
            tssMid: target.selfMetrics.tssMid,
            gi: target.selfMetrics.gi
        },
        ...others
    ];
}
