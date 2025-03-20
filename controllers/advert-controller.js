import { AdvertModel } from "../models/advert-models.js";
import { advertValidator } from "../validators/advert-validators.js";

export const postAdvert = async (req, res, next) => {
  try {
    if (!req.auth) {
      return res.status(401).json({ message: "Authentication required. Please log in." });
    }
    const vendorId = req.auth.id; // Assuming you have the user in req.user after authentication
    // Validate advert information
    const { error, value } = advertValidator.validate({
            vendorId,
            ...req.body,
            pictures: req.files?.map((file)=>{
              return file.filename
         })
    }, {
      abortEarly: false,
    });
    if (error) {
      return res.status(422).json(error);
    }

    const advert = await AdvertModel.create(value);
    res.status(200).json({ message: "New advert created!", Advert: advert });
  } catch (error) {
    next(error);
  }
};

export const getAdverts = async (req, res, next) => {
  try {
    // Destructure filter and sort parameters from the query
    const { filter = "{}", sort = "{}" } = req.query;

    // Parse the filter and sort parameters
    const parsedFilter = JSON.parse(filter);
    const parsedSort = JSON.parse(sort);

    // Fetch adverts with filtering and sorting, and populate vendor data
    const adverts = await AdvertModel.find(parsedFilter)
      .populate('vendorId', 'shopName profilePicture openHours')
      .sort(parsedSort)
      .exec();

    // Return the adverts and the total count
    res.status(200).json({ adverts, totalAdverts: adverts.length });
  } catch (error) {
    next(error);
  }
};

export const getAdvertById = async (req, res, next) => {
  try {
    const advert = await AdvertModel.findById(req.params.id, req.body);
    res.status(200).json(advert);
  } catch (error) {
    next(error);
  }
};


export const updateAdvert = async (req, res, next) => {

  try {
    const advert = await AdvertModel.findByIdAndUpdate(req.params.id, req.body, {new:true,});
    res.status(200).json(advert);
  } catch (error) {
    next(error);
  }
};



export const deleteAdvert = async (req, res, next) => {

  try {
    const advert = await AdvertModel.findByIdAndDelete(req.params.id);
    res.status(200).json(advert);
  } catch (error) {
    next(error);
  }
  
};

