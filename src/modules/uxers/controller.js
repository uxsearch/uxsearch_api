import { firebase, db } from '../../firebase-config'


// let dataAdd = db.collection('uxers').add({
//   name: 'admin4',
//   id: '4',
//   company: 'KMUTT',
//   create: admin.firestore.Timestamp.fromDate(new Date())
// }).then(ref => {
//     console.log('Added document with ID: ', ref.id);
//   })
//   console.log(dataAdd);

// Get a documment : Uxer Collection
// let uxerRef = db.collection('uxers').doc('kaIwZlcUmoCr3Vh9Cmjj');
// uxerRef.get()
//   .then(doc => {
//     if (!doc.exists) {
//       console.log('No such document!');
//     } else {
//       console.log('Document data:', doc.data());
//     }
//   })
//   .catch(err => {
//     console.log('Error getting document', err);
//   })
//   console.log(uxerRef);

export default {
  getAll: async (req, res) => {
    try {
      const getUXer = await db.collection('uxers').doc(DaVmcPqtIxCkbYacCldE).get();
      // const uxers = getAllUXer.get();
      // console.log(getUXer)
      return getUXer
    } catch(error) {
      console.log(error);
    }
  }
}