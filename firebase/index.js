var admin = require("firebase-admin");

var serviceAccount = require("../config/firebaseAdminKey2.json.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin