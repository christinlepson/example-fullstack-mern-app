import Data from '../models/Data';

// this is our get method
// this method fetches all available data in our database
export const getData = (req, res) => {
    Data.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  };
  
  // this is our update method
  // this method overwrites existing data in our database
  export const updateData = (req, res) => {
    const { id, update } = req.body;
    Data.findOneAndUpdate({id}, {$set:update}, err => {
      if (err) return res.json({ success: false, error: err });

      return res.json({ success: true });
    });
  };
  
  // this is our delete method
  // this method removes existing data in our database
  export const deleteData = (req, res) => {
    const { id } = req.body;
    Data.findOneAndDelete({id}, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  };
  
  // this is our create methid
  // this method adds new data in our database
  export const putData = (req, res) => {
    let data = new Data();
  
    const { id, message } = req.body;
  
    if ((!id && id !== 0) || !message) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  };