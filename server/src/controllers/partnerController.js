import Partner from '../models/Partner.js';

export const createPartner = async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Partner inquiry submitted successfully. We will contact you soon.',
      data: partner
    });
  } catch (error) {
    next(error);
  }
};

export const getPartners = async (req, res, next) => {
  try {
    const { 
      companyType, 
      status, 
      partnershipType,
      city,
      page = 1, 
      limit = 10 
    } = req.query;

    const query = {};

    if (companyType) query.companyType = companyType;
    if (status) query.status = status;
    if (partnershipType) query.partnershipType = partnershipType;
    if (city) query['companyAddress.city'] = { $regex: city, $options: 'i' };

    const total = await Partner.countDocuments(query);
    const partners = await Partner.find(query)
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: partners.length,
      total,
      totalPages: Math.ceil(total / limit),
      data: partners
    });
  } catch (error) {
    next(error);
  }
};

export const getPartner = async (req, res, next) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    next(error);
  }
};

export const updatePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find({ isFeatured: true, status: 'Active' })
      .select('companyName companyType logo')
      .limit(10);

    res.status(200).json({
      success: true,
      data: partners
    });
  } catch (error) {
    next(error);
  }
};

export const getPartnerStats = async (req, res, next) => {
  try {
    const stats = await Partner.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const byType = await Partner.aggregate([
      {
        $group: {
          _id: '$companyType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        byStatus: stats,
        byType
      }
    });
  } catch (error) {
    next(error);
  }
};
