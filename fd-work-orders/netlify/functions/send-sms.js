exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const from = process.env.TWILIO_FROM;

  if (!accountSid || !authToken || !from) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Twilio environment variables. Add TWILIO_SID, TWILIO_TOKEN, and TWILIO_FROM to Netlify environment variables.' })
    };
  }

  const { to, message } = JSON.parse(event.body);
  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
  const params = new URLSearchParams();
  params.append('To', to);
  params.append('From', from);
  params.append('Body', message);

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { statusCode: 400, body: JSON.stringify({ error: data.message, code: data.code }) };
    }
    return { statusCode: 200, body: JSON.stringify({ success: true, sid: data.sid }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
