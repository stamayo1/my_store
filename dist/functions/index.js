const functions = require("firebase-functions");
const mainjsFile = require(__dirname + "/server/main");
exports.ngssr = functions.https.onRequest(mainjsFile.app());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
