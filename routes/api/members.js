const express = require('express')
const router = express.Router();
const members = require('../../Members')

//This route Gets all  members
router.get('/', (req, res) => {
    //return some JSON
    res.json(members)
})

//Get single member
router.get('/:id', (req, res) => {
    //some gives us true or false
    const found = members.some(member => member.id === parseInt(req.params.id))

    found ? res.json(members.filter((member) => member.id === parseInt(req.params.id))) : res.status(400).json({ msg: `No member with the id of ${req.params.id}` })

})

router.post('/', (req, res) => {
    res.send(req.body)
})

module.exports = router