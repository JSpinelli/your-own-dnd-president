//const vision = require('@google-cloud/vision');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
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
    const body = {
        requests: [
          {
            features: [
              {
                type: 'LABEL_DETECTION'
              },
              {
                type: 'FACE_DETECTION'
              },
              {
                type: 'SAFE_SEARCH_DETECTION'
              },
              {
                type: 'WEB_DETECTION'
              }
            ],
            image: {
              source: {
                imageUri: 'https://c8.alamy.com/comp/EPF1YW/nun-with-handgun-isolated-on-white-EPF1YW.jpg'
              }
            }
          }]
    };
    await axios.post('https://vision.googleapis.com/v1/images:annotate?key='+API_KEY,body)
        .then( 
            (response)=>{
                res.send(response);
                return;    
            })
        .catch (
            (error) => {
                res.send(error);
    })
});