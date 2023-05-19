import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Swal from 'sweetalert2';


export default function EditProfile() {

   // const[template,setTemplate] = useState({});
   const { id } = useParams();

   const [emp_id, setEmployeeid] = useState("");
   const [name, setEmployeename] = useState("");
   const [gender, setEmployeegender] = useState("");
   const [allocation, setEmployeeallocation] = useState("");
   const [monthly_salary, setEmployeemonthly_salary] = useState("");
   const [address, setEmployeeaddress] = useState("");
   const [gmail, setEmployeegmail] = useState("");
   const [password, setEmployeepassword] = useState("");
   const [mobile_no, setEmployeemobileno] = useState("");
   const [profession, setEmployeeprofession] = useState("");
   const [salary_update, setsalary_update] = useState("");
   const [imgurl, setEImgurl] = useState("");
   
  // const [form, setForm] = useState({
  //   emp_id: "",
  //   name: "",
  //   gender: "",
  //   allocation: "",
  //   monthly_salary: "",
  //   address: "",
  //   gmail: "",
  //   password: "",
  //   mobile_no:"",
  //   profession: "",
  //   salary_update: "",
  //   imgurl: "",
  // });

  const params = useParams();
  // const navigate = useNavigate();

   useEffect(() => {
      axios.get(`http://localhost:8070/employee/${id}`)
        .then((response) => {
          const employee = response.data;
          setEmployeeid(employee.emp_id);
          setEmployeename(employee.name);
          setEmployeegender(employee.gender);
          setEmployeeallocation(employee.allocation);
          setEmployeemonthly_salary(employee.monthly_salary);
          setEmployeeaddress(employee.address);
          setEmployeegmail(employee.gmail);
          setEmployeepassword(employee.password);
          setEmployeemobileno(employee.mobile_no);
          setEmployeeprofession(employee.profession);
          setsalary_update(employee.salary_update);
          setEImgurl(employee.imgurl);

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);


  // const handleSubmit = { async (e) => {
  //   e.preventDefault();
    
  //   console.log(imgurl.name == null);

  //   const storageRef = ref(storage, `employee/${Image.name + v4()}`);

  //                  uploadBytes(storageRef, imgurl)
	// 									.then(() => {
	// 										console.log("uploaded");
	// 									})
	// 									.catch((err) => {
	// 										console.log(err);
	// 									});

              
	// 								getDownloadURL(storageRef)
	// 									.then(async (url) => {
  //                     setEImgurl(url);

  //                     console.log(url);

  //                     const EditProfile = {
  //                         emp_id,
  //                         name,
  //                         gender,
  //                         allocation,
  //                         monthly_salary,
  //                         address,
  //                         gmail,
  //                         password,
  //                         profession,
  //                         mobile_no,
  //                         salary_update,
  //                         imgurl: url,
                      
  //                     };

  //                     axios.put(`http://localhost:8070/employee/update/${id}`, EditProfile)
  //                     .then((response) => {
  //                       console.log(response.data);
  //                       alert("Successfully updated")
  //                           // show success message or redirect to another page
  //                         })

  //                   }).catch((error) => {
  //           console.log(error);
  //           // show error message
  //         });
  //     };


return (
    
<div className="mt-24">
  <div className="container rounded bg-white mt-5 mb-5">
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        console.log(imgurl.name == null);

        const storageRef = ref(storage, `employee/${Image.name + v4()}`);

        await uploadBytes(storageRef, imgurl)
          .then(() => {
            console.log("uploaded");
          })
          .catch((err) => {
            console.log(err);
          });

        await getDownloadURL(storageRef)
          .then(async (url) => {
            setEImgurl(url);

            console.log(url);

            const EditProfile = {
              emp_id,
              name,
              gender,
              allocation,
              monthly_salary,
              address,
              gmail,
              password,
              profession,
              mobile_no,
              salary_update,
              imgurl: url,
            };

            axios
              .put(`http://localhost:8070/employee/update/${id}`, EditProfile)
              .then((response) => {
                console.log(response.data);
                alert("Successfully updated");
                // show success message or redirect to another page
              });
          })
          .catch((error) => {
            console.log(error);
            // show error message
          });
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="border-r">
          <div className="flex flex-col items-center text-center p-3 py-5">
            <img className="rounded-full mt-5" width="150px" src={imgurl} alt="Profile" />
            <span className="font-bold">{name}</span>
            <span className="text-gray-500">{gmail}</span>
          </div>
        </div>
        <div className="border-r">
          <div className="p-3 py-5">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-gray-700">Employee ID</label>
                <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={emp_id} readOnly />
              </div>
              <div>
                <label className="block text-gray-700">Name</label>
                <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={name} onChange={(e) => setEmployeename(e.target.value)} />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Mobile Number</label>
              <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={mobile_no} onChange={(e) => setEmployeemobileno(e.target.value)} />
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Address</label>
              <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={address} onChange={(e) => setEmployeeaddress(e.target.value)} />
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Email</label>
              <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={gmail} onChange={(e) => setEmployeegmail(e.target.value)} />
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Gender</label>
              <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={gender} onChange={(e) => setEmployeegender(e.target.value)} />
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Profile Picture</label>
              <input type="file" id="file" name="image" className="form-input border border-gray-300 rounded py-2 px-4" onChange={(e) => setEImgurl(e.target.files[0])} />
            </div>
            <div className="mt-3">
              <label className="block text-gray-700">Password</label>
              <input type="text" className="form-input border border-gray-300 rounded py-2 px-4" value={password} onChange={(e) => setEmployeepassword(e.target.value)} />
            </div>
            <div className="flex justify-center mt-5">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>


  );
}