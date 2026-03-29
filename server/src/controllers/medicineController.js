import Medicine from '../models/Medicine.js';

export const getMedicines = async (req, res, next) => {
  try {
    const { 
      name, 
      manufacturer, 
      drugClass, 
      form,
      minPrice, 
      maxPrice, 
      requiresPrescription,
      page = 1, 
      limit = 20,
      sort = 'name'
    } = req.query;

    const query = { isAvailable: true };

    if (name) query.name = { $regex: name, $options: 'i' };
    if (manufacturer) query.manufacturer = { $regex: manufacturer, $options: 'i' };
    if (drugClass) query.drugClass = drugClass;
    if (form) query.form = form;
    if (requiresPrescription) query.requiresPrescription = requiresPrescription === 'true';
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const total = await Medicine.countDocuments(query);
    const medicines = await Medicine.find(query)
      .select('-contraindications -interactions')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: medicines.length,
      total,
      totalPages: Math.ceil(total / limit),
      data: medicines
    });
  } catch (error) {
    next(error);
  }
};

export const getMedicine = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id || id.length !== 24 || !/^[a-fA-F0-9]+$/.test(id)) {
      return res.status(400).json({ success: false, message: "Invalid medicine ID format" });
    }

    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found'
      });
    }

    res.status(200).json({
      success: true,
      data: medicine
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: "Invalid medicine ID format" });
    }
    next(error);
  }
};

export const searchMedicines = async (req, res, next) => {
  try {
    const { q, limit = 10 } = req.query;

    const medicines = await Medicine.find({
      $text: { $search: q },
      isAvailable: true
    }, {
      score: { $meta: 'textScore' }
    })
      .select('name genericName manufacturer form price')
      .sort({ score: { $meta: 'textScore' } })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: medicines
    });
  } catch (error) {
    next(error);
  }
};

export const getMedicineByName = async (req, res, next) => {
  try {
    const medicines = await Medicine.find({
      $or: [
        { name: { $regex: req.params.name, $options: 'i' } },
        { genericName: { $regex: req.params.name, $options: 'i' } },
        { brandNames: { $in: [new RegExp(req.params.name, 'i')] } }
      ],
      isAvailable: true
    })
      .select('name genericName manufacturer form price requiresPrescription')
      .limit(20);

    res.status(200).json({
      success: true,
      data: medicines
    });
  } catch (error) {
    next(error);
  }
};

export const getDrugClasses = async (req, res, next) => {
  try {
    const drugClasses = await Medicine.distinct('drugClass', { isAvailable: true });
    
    res.status(200).json({
      success: true,
      data: drugClasses
    });
  } catch (error) {
    next(error);
  }
};

export const getManufacturers = async (req, res, next) => {
  try {
    const manufacturers = await Medicine.distinct('manufacturer', { isAvailable: true });
    
    res.status(200).json({
      success: true,
      data: manufacturers
    });
  } catch (error) {
    next(error);
  }
};
