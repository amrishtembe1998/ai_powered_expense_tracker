import dotenv from 'dotenv';
import admin from '../firebaseAdmin.js';

dotenv.config();

function withTimeout(promise, ms = 10000) {
  let t;
  const timeout = new Promise((_, reject) => {
    t = setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise.finally(() => clearTimeout(t)), timeout]);
}

export const authMiddleware = async (req, res, next) => {
  try {
    // quick runtime checks
    console.log('authMiddleware: admin.apps.length =', admin.apps.length);
    try {
      // optional: surface some limited credential info without printing keys
      const appOpts = admin.app().options || {};
      console.log('authMiddleware: app opts keys:', Object.keys(appOpts));
    } catch (e) {
      console.warn('authMiddleware: could not read admin.app().options', e.message);
    }

    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      console.warn('authMiddleware: missing Bearer header');
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const idToken = authHeader.split(' ')[1];
    if (!idToken) {
      console.warn('authMiddleware: token present but empty after split');
      return res.status(401).json({ message: 'Token missing' });
    }
    console.log('idToken length:', idToken.length);

    // Verify token with Firebase Admin, but guard with timeout
    let decodedToken;
    try {
      decodedToken = await withTimeout(admin.auth().verifyIdToken(idToken), 10000);
    } catch (verifyErr) {
      console.error('authMiddleware: verifyIdToken failed:', verifyErr && verifyErr.message);
      // Helpful hint to user/operator
      if ((verifyErr && verifyErr.message && verifyErr.message.includes('Timed out')) ||
          verifyErr.code === 'ECONNREFUSED') {
        // likely network or metadata call blocked
        return res.status(503).json({ message: 'Auth verification failed: network/credential error' });
      }
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    console.log('decodedToken uid:', decodedToken.uid);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.displayName,
    };

    next();
  } catch (err) {
    console.error('authMiddleware unexpected error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
