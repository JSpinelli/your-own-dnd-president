const vision = require('@google-cloud/vision');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

// The Firebase Admin SDK to access the Firebase Realtime Database.

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const API_KEY='AIzaSyDXXjm_4f-gORdaPG6FhqJgQ3HSmHcXOVo';

exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
  });

exports.vision = functions.https.onRequest(async (req,res) => {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));

});

