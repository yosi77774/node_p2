const jsonfile = require("jsonfile");


exports.getUsers = () =>
{
    return new Promise((resolve, reject) =>
    {
      jsonfile.readFile(__dirname + "/Users.json", function(err,data)
      {
         if(err)
         {
            reject(err)
         }
         else
         {
     
            resolve(data.users)
         }
      })
   })
}

exports.saveUser= (obj) =>
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.writeFile(__dirname + "/Users.json",obj,function(err)
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