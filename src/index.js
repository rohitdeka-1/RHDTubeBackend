import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config();

const PORT = process.env.PORT;



connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server running at ${PORT}`);
    });
    app.on;
  })
  .catch((err) => {
    console.log("DB connection failed !!!", err);
  });















































/*
;(
    async () => {
        try{
            mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
            app.on("error",(error)=>{
                console.log("Error",error);
            })

            app.listen(process.env.PORT,()=>{
                console.log(`${process.env.PORT}`)
            })
        }
        catch(error){
            console.error("Error ", error);
            throw error
        }
    }
)();
*/
