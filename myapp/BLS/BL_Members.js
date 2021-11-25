const membersModel = require('../models/members');
const Members_Dal = require('../DALS/Members_Dal');



const deleteMemberdb = function(id)
{
    return new Promise((resolve, reject) =>
    {
        membersModel.findByIdAndDelete(id,function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('Deleted !')
                }
            })

    })
}


const getMembersdb = function()
{
    return new Promise((resolve, reject) =>
    {
        membersModel.find({}, function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}


const updateMemberdb = function(id,obj)
{
    return new Promise((resolve, reject) =>
    {

        membersModel.findByIdAndUpdate(id,
            {
                name : obj.name,
                Email : obj.Email,
                City : obj.City

            },function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('Updated !')
                }
            })

    })
}


const createMemberdb = function(obj)
{
    return new Promise((resolve, reject) =>
    {
        let Member = new membersModel({
            name : obj.name,
            Email : obj.Email,
            City : obj.City
        });

        Member.save(function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('Created !')
            }
        })
    })
}



const InsertMembersData = async function()
{


    console.log("------start BL-------");
        let resp = await Members_Dal.getMembers();
        let MembersFromWs = resp.data;
    

    return new Promise((resolve, reject) =>
    {
       
        
        let Members = []
       
        MembersFromWs.forEach(x => {
            
            Members[Members.length] = new membersModel({
                name : x.name,
                Email : x.email,
                City : x.address.city
        });
        console.log("Members*********************"+ Members[Members.length-1].name);
        Members[Members.length-1].save(function(err)
        {
            if(err)
            {
                reject(err)
            }

        })

        });
  
        resolve('Created !')


    })
}





module.exports = {createMemberdb,updateMemberdb,getMembersdb,deleteMemberdb,InsertMembersData}