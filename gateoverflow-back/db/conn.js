const mongoos=require('mongoose');

mongoos.connect('mongodb+srv://hemarana9099852230:12345@cluster0.rakth2q.mongodb.net/GRAPHQL').then((res)=>{
    console.log("connection succesfull");
}).catch((err)=>{
    console.log(err.message);
})

