import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function ViewStatus(){
const [Fname, setFname] = useState(null);
	
	
useEffect(() => {
    const fetchFname = async () => {
        const response = await fetch("http://localhost:8070/delidetails");
        const json = await response.json();

        if (response.ok) {
            setFname(json);
        }
    }
    fetchFname();
    }, []);

    return(

        <div className="container">
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			
            <div><h1>dgsggsgdf</h1></div>
            <div>
                <p>{Fname && Fname.map((delidetails)=>(
                    <p key={Fname._id}>{delidetails.fname}</p>
                ))} </p>


            </div>
                



			<br />
			<br />
		</div>
    );
}
