import BloodRequest from '../models/BloodRequest.js';

export const createBloodRequest = async (req, res, next) => {
  try {
    const requestData = {
      ...req.body
    };

    if (req.user) {
      requestData.requester = req.user.id;
    }

    const bloodRequest = await BloodRequest.create(requestData);

    res.status(201).json({
      success: true,
      data: bloodRequest
    });
  } catch (error) {
    next(error);
  }
};

export const registerAsDonor = async (req, res, next) => {
  try {
    const donorData = {
      type: 'Donor',
      donor: req.user.id,
      bloodGroup: req.body.bloodGroup,
      rhFactor: req.body.rhFactor,
      contactPhone: req.body.contactPhone,
      city: req.body.city,
      province: req.body.province,
      area: req.body.area,
      donorNotes: req.body.donorNotes,
      lastDonated: req.body.lastDonated,
      isRegularDonor: req.body.isRegularDonor || false,
      medicalConditions: req.body.medicalConditions || [],
      medications: req.body.medications || [],
      donorAvailability: req.body.donorAvailability || {}
    };

    const donor = await BloodRequest.create(donorData);

    res.status(201).json({
      success: true,
      data: donor
    });
  } catch (error) {
    next(error);
  }
};

export const getBloodRequests = async (req, res, next) => {
  try {
    const { 
      bloodGroup, 
      city, 
      province, 
      urgency, 
      type,
      status = 'Pending',
      page = 1, 
      limit = 10 
    } = req.query;

    const query = { status: { $ne: 'Expired' } };

    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (city) query.city = { $regex: city, $options: 'i' };
    if (province) query.province = province;
    if (urgency) query.urgency = urgency;
    if (type) query.type = type;

    if (status !== 'All') {
      query.status = status;
    }

    const total = await BloodRequest.countDocuments(query);
    const requests = await BloodRequest.find(query)
      .populate('requester', 'name phone')
      .sort('-urgency -createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: requests.length,
      total,
      totalPages: Math.ceil(total / limit),
      data: requests
    });
  } catch (error) {
    next(error);
  }
};

export const getBloodRequest = async (req, res, next) => {
  try {
    const bloodRequest = await BloodRequest.findById(req.params.id)
      .populate('requester', 'name phone')
      .populate('donor', 'name phone');

    if (!bloodRequest) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found'
      });
    }

    bloodRequest.viewCount += 1;
    await bloodRequest.save();

    res.status(200).json({
      success: true,
      data: bloodRequest
    });
  } catch (error) {
    next(error);
  }
};

export const fulfillBloodRequest = async (req, res, next) => {
  try {
    const bloodRequest = await BloodRequest.findById(req.params.id);

    if (!bloodRequest) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found'
      });
    }

    if (bloodRequest.status === 'Fulfilled' || bloodRequest.status === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'This request cannot be fulfilled'
      });
    }

    bloodRequest.fulfilledBy.push({
      donor: req.user.id,
      unitsDonated: req.body.units || 1,
      date: new Date(),
      bloodBank: req.body.bloodBank || ''
    });

    bloodRequest.fulfilledUnits += req.body.units || 1;

    if (bloodRequest.fulfilledUnits >= bloodRequest.units) {
      bloodRequest.status = 'Fulfilled';
    }

    await bloodRequest.save();

    res.status(200).json({
      success: true,
      data: bloodRequest
    });
  } catch (error) {
    next(error);
  }
};

export const getDonors = async (req, res, next) => {
  try {
    const { bloodGroup, city, page = 1, limit = 10 } = req.query;

    const query = { type: 'Donor', status: { $ne: 'Cancelled' } };

    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (city) query.city = { $regex: city, $options: 'i' };

    const total = await BloodRequest.countDocuments(query);
    const donors = await BloodRequest.find(query)
      .select('bloodGroup rhFactor city area donorAvailability isRegularDonor lastDonated')
      .sort('-isRegularDonor -createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: donors.length,
      total,
      data: donors
    });
  } catch (error) {
    next(error);
  }
};

export const getBloodGroups = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  });
};
