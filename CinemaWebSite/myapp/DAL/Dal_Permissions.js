const jsonfile = require("jsonfile");

exports.getPermissions = () =>
{
    return new Promise((resolve, reject) =>
    {
      jsonfile.readFile(__dirname + "/Permissions.json", function(err,data)
      {
         if(err)
         {
            reject(err)
         }
         else
         {
     
            resolve(data.Permissions)
         }
      })
   })
}

exports.saveUserPermissions= (obj) =>
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.writeFile(__dirname + "/Permissions.json",obj,function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve("Created");
            }
        })
    })
    
}