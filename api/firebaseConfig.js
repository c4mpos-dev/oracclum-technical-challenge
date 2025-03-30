const admin = require("firebase-admin");

dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert("serviceAccountKey.json")
});

const db = admin.firestore();

module.exports = { db };