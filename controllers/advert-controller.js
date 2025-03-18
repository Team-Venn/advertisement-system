import { AdvertModel } from "../models/advert-models.js";
import { advertValidator } from "../validators/advert-validators.js";

export const postAdvert = async (req, res, next) => {
  try {
    // Validate advert information
    const { error, value } = advertValidator.validate(req.body, {
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

export const getAdvert = async (req, res, next) => {
  try {
    const advert = await AdvertModel.find();
    res.status(200).json({ message: "All adverts", advert });
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

