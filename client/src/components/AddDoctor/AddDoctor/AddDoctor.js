import React, { useState } from 'react';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';

const AddDoctor = () => {
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null)
    const handleBlur = e => {
        const newInfo = {...info};
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const handleFileChange = e => {
        const newFile = e.target.files[0];
        setFile(newFile)
    }

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('file', file);
        formData.append('name', info.name);
        formData.append('email', info.email);
        
        fetch('http://localhost:5000/addDoctor', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    return (
        <div className="container-fluid row " >
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <h5 className="text-brand">Add Doctor</h5>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control"
                        onBlur={handleBlur}
                        name="email"
                        placeholder="Enter email"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Name</label>
                        <input type="text" class="form-control" 
                        onBlur={handleBlur}
                        name="name"
                        placeholder="Name"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Upload a image</label>
                        <input onChange={handleFileChange} type="file" class="form-control" id="exampleInputPassword1" placeholder="Picture"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;