import Express from 'express'
import Interest from '../models/interestModel';

/**  METHODS  
 * get_all 
 * post_one
 * delete_one_by_id
*/

// get_all
async function  get_all  (req: Express.Request, res: Express.Response) {
  try {
    const interests = await Interest.find({});
    res.status(200).json(interests);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

//post_one
async function post_one(req: Express.Request, res: Express.Response) {
  try {
    const interest = req.body;
    const createdInterest =  await Interest.create(interest);
    res.status(201).json(createdInterest);
  }
  catch(error: any) {
    res.status(400).json(error.message);
  }
}

//delete_one_by_id
async function delete_one_by_id(req: Express.Request, res: Express.Response) {
  try {
    const { interestId } = req.params;
    const deleted = await Interest.findByIdAndDelete(interestId);
    res.status(200).json(deleted);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}


//exports
export {
  get_all,
  post_one,
  delete_one_by_id
}
