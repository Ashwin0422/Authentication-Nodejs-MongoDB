const { body, validationResult } = require('express-validator');

const validateRegistration = [
    body('username')
        .isLength({ min: 3, max: 50 })
        .withMessage('Username must be between 3 and 50 characters')
        .isAlphanumeric()
        .withMessage('Username must contain only letters and numbers'),
    
    body('gmail')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validation failed',
                details: errors.array() 
            });
        }
        next();
    }
];

const validateLogin = [
    body('gmail')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validation failed',
                details: errors.array() 
            });
        }
        next();
    }
];

module.exports = {
    validateRegistration,
    validateLogin
}; 