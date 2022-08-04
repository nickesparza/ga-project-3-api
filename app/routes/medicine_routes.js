// pulled from patients routes /////////////////////////
const express = require('express')
const passport = require('passport')
const Pet = require('../models/patient')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const pet = require('../models/patient')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// pulled from patients, now go to server and copy patients route change to toy and add it to app.use under pets 

/////////////////routes go below////////////////////////////////

//// CREATE
// POST /medication/<pet_id>
router.post('/medication/:patientId', removeBlanks, (req, res, next) => {
	// //get our toy from req.body
    const medication = req.body.medication
    //get our patient's id from req.params.patientId
	const patientId = req.params.patientId

	Patient.findById(patientId)
		// respond to succesful `create` with status 201 and JSON of new "patient"
		.then(handle404)
        .then(patient => {
            console.log('this is the patient', patient)
            console.log('this is the medication', medication)
            // push the medication to the patient medication array 
            patient.medication.push(medication)
            //save the patient 
            return patient.save()
        }) 
        //send the newly updated patient as json
        .then(patient => res.status(201).json({patient: patient}))
		.catch(next)
})

// UPDATE a Medication
// PATCH /medication/<patient_id>/<medication_id>
router.patch('/medication/:patientId/:medicationId', requireToken, removeBlanks, (req, res, next) => {
    // get the toy and the pet ids saved to variables
    const patientId = req.params.patientId
    const medicationId = req.params.medicationId

    // find our pet
    Patient.findById(patientId)
        .then(handle404)
        .then(patient => {
            // single out the medication (.id is a subdoc method to find something in an array of subdocs)
            const theMedication = patient.medication.id(medicationId)
            // make sure the user sending the request is the owner
            requireOwnership(req, patient)
            // update the medication with a subdocument method
            theMedication.set(req.body.medication)
            // return the saved medication
            return medication.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

//delete
//Delete /medication/<patient_Id>/<medication_Id>
router.delete('/medication/:patientId/:medicationId', requireToken, (req,res,next)=> {
    // get the medication and the patient ids saved to variables
    const patientId =req.params.patientId
    const medicationId = req.params.medicationId
    //then we find patient 
    Patient.findById(patientId)
    //handle 404
    .then(handle404)
    //do stuff with medication (in this case delete it )
    .then(patient => {
        //we can get subdoc same way as update 
        const theMedication = patient.medication.id(toyId)
        //require user deleting is the owner of the patient
        requireOwnership(req,patient)
        //call remove on the subdoc
        theMedication.remove()
        //return the saved patient
        return patient.save()
    })
    //send 204 no content status
    .then(()=> res.sendStatus(204))
    //handle errors
    .catch(next)

})


//export router 
module.exports = router