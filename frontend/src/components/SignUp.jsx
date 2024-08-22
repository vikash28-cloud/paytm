import { Link, useNavigate } from "react-router-dom";
import BottomWarning from "./BottomWarning";
import Button from "./Button";
import Heading from "./Heading";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import { useState } from "react";
import axios from "axios"


const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center ">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"SignUp"} />
                <SubHeading label={"enter your information to create an account"} />
                <InputBox onchange={e => {
                    setFirstName(e.target.value);
                }}
                    label={"First Name"} placeholder={"John"} />
                <InputBox onchange={e => {
                    setLastName(e.target.value);
                }}
                    label={"Last Name"} placeholder={"Doe"} />
                <InputBox onchange={e=>{
                    setUsername(e.target.value);
                }}  label={"Email"} placeholder={"abc@gmail.com"} />
                <InputBox onchange={e=>{
                    setPassword(e.target.value);
                }}  label={"Password"} placeholder={"123456"} />
                <div className="pt-4">
                    <Button label={"SignUp"} onClick={async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            
                            firstName,
                            lastName,
                            username,
                            password
                        })

                        navigate("/signin")
                    }}/>
                </div>
                <BottomWarning label={"Already have an account ?"} buttonText={"SignIn"} to={"/signin"} />
            </div>

        </div>

    </div>
}

export default SignUp; 