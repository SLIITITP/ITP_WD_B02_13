const Router = require("express").Router();
let Employee = require("../models/Employee");


router.route("/add").post((req,res) => {  
    

    const emp_id = req.body.emp_id;
    const name =  req.body.name; 
    const gender = req.body.gender;   
    const profession = req.body.profession;
    const monthly_salary = Number(req.body.monthly_salary);
    const address = req.body.address;
    const gmail = req.body.gmail;
    const password = req.body.password;
    const allocation = req.body.allocation;


    const newEmployee= new Employee({ 

        emp_id,
        name,
        gender,
        profession,
        monthly_salary,
        address,
        gmail,
        password,
        allocation

    })

    // insert values to the database 
    newEmployee.save().then(()=>{  
        res.json("Employee Added") 
    }).catch((err)=>{ 
        console.log(err); 
    })
})

// http://localhost:8070/Student

router.route("/").get((req,res) =>{

    Employee.find().then((Employee)=>{ 
        res.json(Employee) 
    }).catch((err)=>{
        console.log(err)
    })
})

// http//localhost:8070/student/update/(id) ----> update/id of the student 
router.route("/update/:id").put(async (req,res)=>{ // : must ----> :studentId
    let userId = req.params.id;
    
    const{ emp_id,name,gender,profession,monthly_salary,address,gmail,password,allocation} = req.body; //destructure method // updated  details

    const updateStudent = { // object create update student
        emp_id,
        name,
        gender,
        profession,
        monthly_salary,
        address,
        gmail,
        password,
        allocation,
    }

    const update  = await Employee.findByIdAndUpdate(userId, updateEmployee).then(()=>{   // check whether id has in the system ---> model  (user id,{ name, age , gender})
        res.status(200).send({status: "user update"})                   // or can send updated user({status: "user update", user: updated})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message}); // error
    })
})

// http//localhost:8070/student/delete/(id)
router.route("/delete/:id").delete(async(req,res)=> {
    let userId = req.params.id;

    await Employee.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"User Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:" Error with delete user", error:err.message});
    })
})

// only get 1 student ----
router.route("/get/:id").get(async (req,res)=>{
    let userId = req.params.id;
    const user = await Employee.findById(userId) // if use email ----> await Student.findOne(email)
    .then((student)=>{  // then((student) ---> 
        res.status(200).send({status:"User Fetched", student}); // ({status:"User Fetched", user:user}) ---> updated user frontend ekata yawanna
    }).catch(()=>{
        res.status(500).send({status:" Error with get user ", error:err.message}); //status --> not a key word
    })
})

module.exports = Router;