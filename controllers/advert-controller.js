import { AdvertModel } from "../models/advert-models.js";
import { advertValidator } from "../validators/advert-validators.js";

export const postAdvert = async (req, res, next) => {
  try {
    if (!req.auth) {
      return res
        .status(401)
        .json({ message: "Authentication required. Please log in." });
    }
    // Validate advert information
    const { error, value } = advertValidator.validate(
      {
        ...req.body,
        pictures: req.files?.map((file) => {
          return file.filename;
        }),
      },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res.status(422).json(error);
    }

    const advert = await AdvertModel.create({
      ...value,
      vendorId: req.auth.id,
    });
    res.status(201).json({ message: "New advert created!", Advert: advert });
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
      .populate("vendorId", "profilePicture shopName socialMediaLink openHours")
      .sort(parsedSort)
      .exec();

    // Return the adverts and the total count
    res.status(200).json({ adverts, totalAdverts: adverts.length });
  } catch (error) {
    next(error);
  }
};

export const getVendorAdverts = async (req, res, next) => {
  try {
    // // Make sure the user is authenticated
    if (!req.auth || !req.auth.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Extract the vendor's ID from the authenticated user
    const vendorId = req.auth.id;

    // Fetch all adverts for the specific vendor and populate vendor data
    const adverts = await AdvertModel.find({ vendorId }) // Filter by vendorId
      .populate("vendorId", "profilePicture shopName socialMediaLink openHours")
      .exec();

    // Return the adverts and the total count
    res.status(200).json({ adverts, totalAdverts: adverts.length });
  } catch (error) {
    next(error);
  }
};

export const getVendorAdvertsById = async (req, res, next) => {
  try {
    // // Make sure the user is authenticated
    if (!req.auth || !req.auth.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Extract the vendor's ID from the authenticated user
    const vendorId = req.auth.id;

    // Fetch all adverts for the specific vendor and populate vendor data
    const adverts = await AdvertModel.findOne({ vendorId, _id:req.params.id }) // Filter by vendorId
      // .populate("vendorId", "profilePicture shopName socialMediaLink openHours")
      // .exec();

    // Return the adverts and the total count
    res.status(200).json({ adverts});
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
    const { error, value } = advertValidator.validate(
      {
        ...req.body,
        pictures: req.files?.map((file) => {
          return file.filename;
        }),
      },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res.status(422).json(error);
    }

    const advert = await AdvertModel.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    res.status(200).json({ message: "Advert Updated !", advert });
  } catch (error) {
    next(error);
  }
};

export const replaceAdvert = async (req, res, next) => {
  try {
    const { error, value } = advertValidator.validate(
      {
        ...req.body,
        pictures: req.files?.map((file) => {
          return file.filename;
        }),
      },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res
        .status(422)
        .json({ message: "Validation Error", details: error.details });
    }

    const advert = await AdvertModel.findOneAndReplace(
      { _id: req.params.id },
      value,
      { new: true }
    );
    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }
    res.status(200).json({ message: "Advert Replaced", advert });
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
