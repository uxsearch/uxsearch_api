import firebase from '../../firebase-config'
import { db } from '../../firebasehelper'

export default {
  getAll: async (req, res) => {
    try {
      const uxersSnapshot = await db.collection('uxers').get();
      const uxers = [];
      uxersSnapshot.forEach((doc) => {
        uxers.push({
          id: doc.id,
          data: doc.data()
        });
      });
      res.json(uxers);
    } catch (e) {
      next(e);
    }
  }
}