import * as dataController from '../controllers/data.ctrl';

const data = router => {
    // this is our get method
    // this method fetches all available data in our database
    router.get("/getData", dataController.getData);

    // this is our update method
    // this method overwrites existing data in our database
    router.post("/updateData", dataController.updateData);

    // this is our delete method
    // this method removes existing data in our database
    router.delete("/deleteData", dataController.deleteData);

    // this is our create methid
    // this method adds new data in our database
    router.post("/putData", dataController.putData);
};

export default data;