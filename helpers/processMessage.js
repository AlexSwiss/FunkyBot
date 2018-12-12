const API_AI_TOKEN = '1678ee44ab9a4d09b858c1a385ee7061';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAYE2Fh4xpsBADkIGaAcx4HXaIhNK4bbmq828Pk6ePUKLZAbphgTopkzahaFIIdqTDyEdbCQaW45kZC0dgZCVuYbXVoZBqnoWg1kUf1HoBP2fuZBxcS0D2DZBtp6xDd0aeDkZA33AEwRZCeRZAUZAIRmihnvHHSdNsyoT5hWqwYc9QwwZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'FunkyBot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};