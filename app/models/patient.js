const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: String,
			required: true,
		},
        bloodType: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', "O-"],
            default: 'O+'
        },
        emergencyContact: String,
        preCon: String,
        currCon: {
            type: String,
            enum: ['stable', 'serious', 'critical'],
            default: 'stable'
        },
        treatment: {
            type: String,
            default: 'No treatment assigned.'
        },
        medicines: [medicineSchema],
        comments: String,
		doctors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            }
		],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Patient', patientSchema)
