const express = require('express')
const uuid = require('uuid')
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
    const newMember = {
        //v4 is a method that generates new random universal id
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    //Add new member onto array, but make sure name and email are sent with request
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' })
    }
    //adds member to array
    members.push(newMember)
    //return entire array of members, including new one
    res.json(members)
    // res.redirect('/')


})

//Update Member
router.put('/:id', (req, res) => {
    //some gives us true or false
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        const updMember = req.body;
        //loop through members we have and check to see if it matches if, if it does that's the one we want to update
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                //if name/email was sent w request, set to new name, otherwise old one
                member.name = updMember.name ? updMember.name : member.name
                member.email = updMember.email ? updMember.email : member.email
                res.json({ msg: `Member updated`, member })
            }

        })
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }

})

//Delete Member
router.delete('/:id', (req, res) => {
    //some gives us true or false
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        //return all members except one deleted
        res.json({ msg: "Member deleted", members: members.filter(member => member.id !== parseInt(req.params.id)) })
    } else {
        res.status(400).json({ message: `No member with id of ${req.params.id}` })
    }

})




module.exports = router