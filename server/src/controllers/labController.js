import Lab from '../models/Lab.js';

export const getLabs = async (req, res, next) => {
  try {
    const { city, type, page = 1, limit = 10 } = req.query;

    const query = { isVerified: true };

    if (city) query['address.city'] = { $regex: city, $options: 'i' };
    if (type) query.type = type;

    const total = await Lab.countDocuments(query);
    const labs = await Lab.find(query)
      .select('-tests.sideEffects -tests.interactions')
      .sort('-isFeatured -rating')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: labs.length,
      total,
      totalPages: Math.ceil(total / limit),
      data: labs
    });
  } catch (error) {
    next(error);
  }
};

export const getLab = async (req, res, next) => {
  try {
    const lab = await Lab.findById(req.params.id);

    if (!lab) {
      return res.status(404).json({
        success: false,
        message: 'Lab not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lab
    });
  } catch (error) {
    next(error);
  }
};

export const getLabTests = async (req, res, next) => {
  try {
    const { labId, category, minPrice, maxPrice } = req.query;

    const lab = await Lab.findById(labId);
    if (!lab) {
      return res.status(404).json({
        success: false,
        message: 'Lab not found'
      });
    }

    let tests = lab.tests;

    if (category) {
      tests = tests.filter(t => t.category === category);
    }
    if (minPrice) {
      tests = tests.filter(t => t.price >= Number(minPrice));
    }
    if (maxPrice) {
      tests = tests.filter(t => t.price <= Number(maxPrice));
    }

    res.status(200).json({
      success: true,
      data: tests
    });
  } catch (error) {
    next(error);
  }
};

export const searchLabs = async (req, res, next) => {
  try {
    const { q, city, limit = 5 } = req.query;

    const query = { isVerified: true };
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { services: { $in: [new RegExp(q, 'i')] } }
      ];
    }
    if (city) query['address.city'] = { $regex: city, $options: 'i' };

    const labs = await Lab.find(query)
      .select('name address rating')
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: labs
    });
  } catch (error) {
    next(error);
  }
};

export const getTestCategories = async (req, res, next) => {
  try {
    const categories = [
      'Blood', 'Urine', 'Stool', 'X-Ray', 'MRI', 'CT Scan', 
      'Ultrasound', 'ECG', 'EEG', 'Biopsy', 'Pathology', 
      'Radiology', 'Cardiology', 'Neurology', 'Other'
    ];
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};
