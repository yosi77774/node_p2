const Dal_Members = require('../DAL/Dal_Members');


const getMembers = async function () {
    
    let resp = await Dal_Members.getMembers();
    let Members = resp.data;

    return Members
}

const deleteMember = async function (id) {
    
    let resp = await Dal_Members.deleteMember(id);
    

    return resp
}


const updateMember = async function (id,obj){
    
    let resp = await Dal_Members.updateMember(id,obj);

    
    return resp
}

const AddMember = async function (obj){
    
    let resp = await Dal_Members.createMember(obj);

    
    return resp
}

module.exports = {AddMember,updateMember,deleteMember,getMembers}