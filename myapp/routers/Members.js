const express = require('express');
const BL_Members = require('../BLS/BL_Members');

const router = express.Router();

router.route('/')
    .get(async function(req,resp)
    {   
         console.log("start main");

        let members
        members = await BL_Members.getMembersdb();

        console.log("length1 "+members.length);
        if(members.length == 0){

        let status = await BL_Members.InsertMembersData();
        console.log("status InsertMembersData: "+status);
        members = await BL_Members.getMembersdb();
        console.log("length2 "+members.length);

    }
    
    console.log("length3 "+members.length);
    
        return resp.json(members)

    })

    router.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;
        let status = await BL_Members.deleteMemberdb(id);
        console.log(status);
        return resp.json(status)
    })

    router.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;
        let status = await BL_Members.updateMemberdb(id,obj);
        return resp.json(status)
    })

    router.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;
        let status = await BL_Members.createMemberdb(obj);
        return resp.json(status)
    })



module.exports = router;