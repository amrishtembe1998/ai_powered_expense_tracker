import admin from 'firebase-admin';

const serviceAccount = process.env.SERVICE_ACCOUNT_JSON_BASE64
  ? JSON.parse(
      Buffer.from(
        process.env.SERVICE_ACCOUNT_JSON_BASE64,
        'base64'
      ).toString('utf8')
    )
  : null;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
  });
}

export default admin;
