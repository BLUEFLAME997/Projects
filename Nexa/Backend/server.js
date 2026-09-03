import app from "./src/app.js";
import connectToDataBase from "./src/config/database.js";

connectToDataBase();

app.listen(8000,()=>{
  console.log("Server running on port 8000..")
})