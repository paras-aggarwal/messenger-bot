const API_AI_TOKEN = '467f56b490624bc6a07d0599f5eb95b5';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAADYGV8ZBR3cBAF27QuXRwqsRtTsZBeATXsqVFqhblBOoUkb5PjMwDnnjCB5KZAHhqfHsaj8Lp6AoWiVgyNZCdappLp9N7zmytucMAtyUigKqIofGI7KdR94jZAZB2FnrgFKZAVHNJFhhBoHUrX4Qqhbtr42UZAdfAlFVGdEnZBVaFVy4ALRPJHVR';
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
	const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'sambot'});
	apiaiSession.on('response', (response) => {
 		const result = response.result.fulfillment.speech;
		sendTextMessage(senderId, result);
 	});
	apiaiSession.on('error', error => console.log(error));
 	apiaiSession.end();
};