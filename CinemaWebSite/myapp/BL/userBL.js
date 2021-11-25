const UserModel = require('../models/userModel')
const Dal_Users = require('../DAL/Dal_Users');
const Dal_Permissions = require('../DAL/Dal_Permissions');


const getusersDB = function()
{
        return new Promise((resolve, reject) =>

        {

        UserModel.find({}, function(err,data)
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

const getUser = function(obj)
{
    console.log(obj.UserName+"******************");
    return new Promise((resolve, reject) =>
    {
        
        UserModel.find({"UserName" : obj.UserName}, function(err, data)
        {
            if(err)
            {
                console.log("false");
                reject(false)
            // reject("Registration attempt failed! (You must create a username and get a username from the system administrator).")
            }
            else
            {
                console.log(data[0]);
                resolve(data[0])
            }
        })
 
    })
}


const updateUserdb = function(id,obj)
{
    return new Promise((resolve, reject) =>
    {

        UserModel.findByIdAndUpdate(id,
            {
                UserName : obj.UserName,
                Password : obj.Password

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


const checkUser =async function(obj)
{
    let resp = await Dal_Permissions.getPermissions()

    return new Promise((resolve, reject) =>
    {
        
                UserModel.find({"Username" : obj.Username, "Password" : obj.Password}, function(err, data)
                {
                    if(err)
                    {
                      
                        reject(false)
                       // reject("Registration attempt failed! (You must create a username and get a username from the system administrator).")
                    }
                    else
                    {

                        
                        let objPermissions
                        resp.forEach(element => {
                           
                            if(element.id==data[0]._id){
                            objPermissions=element.Permissions
                            console.log(objPermissions[0]+"-------------");
                        }
                        });
                       
                        
                        resolve(objPermissions)
                    }
                })
           
        
        
    })
}

const Add_User = async function(obj)
{
  
    let resp  = {"users" : await Dal_Users.getUsers()}
    let resp2  = {"Permissions" : await Dal_Permissions.getPermissions()}
    let status = await createUserDB(obj)
    let user = await getUser({"UserName" : obj.UserName})

    if(status=='Created !'){
   console.log(obj.SessionTimeOut);
    let objuser = {
        "id" : user.id,
       "First_Name" : obj.First_Name,
       "Last_Name" : obj.Last_Name,
       "Created_date" : new Date(),
       "SessionTimeOut" : obj.SessionTimeOut
    }
    resp.users[resp.users.length] = objuser
    let resp3 = await Dal_Users.saveUser(resp);

    let objPermissionsuser = {
        "id" : user.id,
        "Permissions" : obj.Permissions
    }

    resp2.Permissions[resp2.Permissions.length] = objPermissionsuser
    let resp4 = await Dal_Permissions.saveUserPermissions(resp2);

    if(resp4=="Created"&&resp3=="Created"){
        return resp3;
    }
    else{
        return "Error"
    }
    
    }
    else {
        console.log(status);
    return status;
}
      
}


const createUserDB = function(obj)
{
    console.log( obj.UserName+"-----------------");
    return new Promise((resolve, reject) =>
    {
        let user = new UserModel({
            UserName : obj.UserName,
            Password : ""
        });

        user.save(function(err)
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


const getUserViews = async function()
{
    let resp  = {"users" : await Dal_Users.getUsers()}
    let resp2  = {"Permissions" : await Dal_Permissions.getPermissions()}
    let resp3  = await getusersDB()
    let usersdata = []

    resp3.forEach(element => {
     
        usersdata[usersdata.length]={"id" : element.id,"UserName":element.UserName,"First_Name" : "","SessionTimeOut":"","Created_date" : "","Permissions" :""}

    });

    resp.users.forEach(element => {
        
      
        for (let index = 0; index < usersdata.length; index++) {
            if (usersdata[index].id==element.id) {

            usersdata[index].First_Name = element.First_Name
            usersdata[index].Last_Name = element.Last_Name
            usersdata[index].SessionTimeOut = element.SessionTimeOut+""
            usersdata[index].Created_date = element.Created_date 
        }
            
        }
    
    });

    resp2.Permissions.forEach(element => {

            for (let index = 0; index < usersdata.length; index++) {
                if (usersdata[index].id==element.id) {
                usersdata[index].Permissions = element.Permissions
            }
        }
    });

     return usersdata;
}


const getUserById = function(id)
{
    return new Promise((resolve, reject) =>
    {
        UserModel.findById(id, function(err, data)
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

const updateUser = async function(obj)
{
    let Userdb = await getUserById(obj.id)
    let resp  = {"users" : await Dal_Users.getUsers()}
    let resp2  = {"Permissions" : await Dal_Permissions.getPermissions()}
    let arrusers = []
    let Permissions = []
    console.log(Userdb);
    let usrsb = {"Password" : Userdb.Password,"UserName" :obj.UserName}
    let statusupdate = await updateUserdb(Userdb.id,usrsb)

   
    resp.users.forEach(element => {
        if(element.id!=obj.id){
        arrusers[arrusers.length]=element
    }
    else if(element.id==obj.id){
        arrusers[arrusers.length]=element
        arrusers[arrusers.length-1].First_Name =  obj.First_Name
        arrusers[arrusers.length-1].Last_Name =  obj.Last_Name
        arrusers[arrusers.length-1].SessionTimeOut =  obj.SessionTimeOut
    }
    });

    resp2.Permissions.forEach(element => {
        if(element.id!=obj.id){
        Permissions[Permissions.length]=element
    }

    else if(element.id==obj.id){
        Permissions[Permissions.length]=element
        Permissions[Permissions.length-1].Permissions=obj.Permissions
    }

    });


    let statusPermissions = await Dal_Permissions.saveUserPermissions({"Permissions" : Permissions});
    let statussers = await Dal_Users.saveUser({"users":arrusers});

    console.log("-------statusupdate---------"+statusupdate+"-----statusPermissions-----"+statusPermissions+"-----statussers----"+statussers);

    return "Updated"
}

const deleteUserdb = function(id)
{
    return new Promise((resolve, reject) =>
    {
        UserModel.findByIdAndDelete(id,function(err)
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

const deleteUser =async function(id)
{
    let status = await deleteUserdb(id)
    console.log(status);
    let resp  = {"users" : await Dal_Users.getUsers()}
    let resp2  = {"Permissions" : await Dal_Permissions.getPermissions()}
    let arrusers = []
    let Permissions = []

    resp.users.forEach(element => {
        if(element.id!=id){
        arrusers[arrusers.length]=element
    }
    });

    resp2.Permissions.forEach(element => {
        if(element.id!=id){
        Permissions[Permissions.length]=element
    }
    });

    let statusPermissions = await Dal_Permissions.saveUserPermissions({"Permissions" : Permissions});
    let statussers = await Dal_Users.saveUser({"users":arrusers});

   console.log(status+"----------"+statusPermissions+"---------"+statussers);
}




module.exports = {createUserDB,Add_User,checkUser,updateUserdb,getUser,getusersDB,getUserViews,deleteUser,updateUser}
