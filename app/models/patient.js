const mongoose = require('mongoose')
// medicineSchema is required for this to work, since it is a subdocument for patient
const medicineSchema = require ('./medicine')

// create new schema for patients
const patientSchema = new mongoose.Schema(
	{
        // name is a string, and required
		name: {
			type: String,
			required: true,
		},
        // age is a string, and required
		age: {
			type: String,
			required: true,
		},
        // blood type is a string limited to the possible blood types, and required
        bloodType: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', "O-"],
            default: 'O+',
            required: true
        },
        // emergency contact is an optional string
        emergencyContact: String,
        // pre-existing conditions is an optional string
        preCon: String,
        // current condition is an optional string, but the default is "stable"
        currCon: {
            type: String,
            enum: ['stable', 'serious', 'critical'],
            default: 'stable'
        },
        // treatment is an optional string, but the default is "no treatment assigned"
        treatment: {
            type: String,
            default: 'No treatment assigned.'
        },
        // medicines will be a list of medicines derived from the medicine schema imported above
        medicines: [medicineSchema],
        // comments are an optional string
        comments: String,
        // doctors take the place of "owners", will be an array of user IDs that are updated when users add themselves as attending to a patient
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
