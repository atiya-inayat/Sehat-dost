import Hospital from '../models/Hospital.js';

export const getHospitals = async (req, res, next) => {
  try {
    const { city, province, type, search, page = 1, limit = 10 } = req.query;

    const query = { isVerified: true };

    if (city) query['address.city'] = { $regex: city, $options: 'i' };
    if (province) query['address.province'] = { $regex: province, $options: 'i' };
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'address.area': { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Hospital.countDocuments(query);
    const hospitals = await Hospital.find(query)
      .populate('doctors', 'user specialty')
      .sort('-isFeatured -rating')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: hospitals.length,
      total,
      totalPages: Math.ceil(total / limit),
      data: hospitals
    });
  } catch (error) {
    next(error);
  }
};

export const getHospital = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id || id.length !== 24 || !/^[a-fA-F0-9]+$/.test(id)) {
      return res.status(400).json({ success: false, message: "Invalid hospital ID format" });
    }

    const hospital = await Hospital.findById(id)
      .populate('doctors')
      .populate('departments.head', 'user specialty');

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }

    res.status(200).json({
      success: true,
      data: hospital
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: "Invalid hospital ID format" });
    }
    next(error);
  }
};

export const createHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.create(req.body);

    res.status(201).json({
      success: true,
      data: hospital
    });
  } catch (error) {
    next(error);
  }
};

export const searchHospitals = async (req, res, next) => {
  try {
    const { q, limit = 5 } = req.query;

    const query = { isVerified: true };
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { 'address.city': { $regex: q, $options: 'i' } },
        { services: { $in: [new RegExp(q, 'i')] } }
      ];
    }

    const hospitals = await Hospital.find(query)
      .select('name address services rating')
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: hospitals
    });
  } catch (error) {
    next(error);
  }
};

export const getCities = async (req, res, next) => {
  try {
    const cities = await Hospital.distinct('address.city', { isVerified: true });
    
    res.status(200).json({
      success: true,
      data: cities
    });
  } catch (error) {
    next(error);
  }
};
