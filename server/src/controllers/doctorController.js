import Doctor from '../models/Doctor.js';
import User from '../models/User.js';

export const getDoctors = async (req, res, next) => {
  try {
    const { 
      specialty, 
      city, 
      minFee, 
      maxFee, 
      gender, 
      isOnline,
      search,
      page = 1,
      limit = 10,
      sort = '-createdAt'
    } = req.query;

    const query = { isVerified: true };

    if (specialty) query.specialty = specialty;
    if (gender) query.gender = gender;
    if (isOnline === 'true') query.isOnline = true;
    if (minFee || maxFee) {
      query.fee = {};
      if (minFee) query.fee.$gte = Number(minFee);
      if (maxFee) query.fee.$lte = Number(maxFee);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { hospital: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Doctor.countDocuments(query);
    const doctors = await Doctor.find(query)
      .populate('user', 'name email phone avatar')
      .populate('hospitalId', 'name address')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: doctors.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: doctors
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'name email phone avatar')
      .populate('hospitalId', 'name address helpline');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorByPMC = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ pmcId: req.params.pmcId })
      .populate('user', 'name email phone avatar')
      .populate('hospitalId', 'name address');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (req, res, next) => {
  try {
    const { userId, ...doctorData } = req.body;

    const existingDoctor = await Doctor.findOne({ pmcId: doctorData.pmcId });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor with this PMC ID already exists'
      });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== 'doctor') {
      return res.status(400).json({
        success: false,
        message: 'User not found or not authorized as doctor'
      });
    }

    const doctor = await Doctor.create({
      ...doctorData,
      user: userId
    });

    res.status(201).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const { pmcId, user, ...updateData } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

export const getSpecialties = async (req, res, next) => {
  try {
    const specialties = await Doctor.distinct('specialty', { isVerified: true });
    
    res.status(200).json({
      success: true,
      data: specialties
    });
  } catch (error) {
    next(error);
  }
};

export const searchDoctors = async (req, res, next) => {
  try {
    const { q, specialty, limit = 5 } = req.query;

    const query = { isVerified: true };
    
    if (specialty) query.specialty = specialty;
    if (q) {
      query.$or = [
        { 'user.name': { $regex: q, $options: 'i' } },
        { hospital: { $regex: q, $options: 'i' } },
        { specialty: { $regex: q, $options: 'i' } }
      ];
    }

    const doctors = await Doctor.find(query)
      .populate('user', 'name')
      .select('specialty hospital fee')
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: doctors
    });
  } catch (error) {
    next(error);
  }
};
