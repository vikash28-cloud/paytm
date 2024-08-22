import { useState } from "react"
import BottomWarning from "./BottomWarning"
import Button from "./Button"
import Heading from "./Heading"
import InputBox from "./InputBox"
import SubHeading from "./SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
    const navigate = useNavigate();
    const[username,setusername] = useState("");
    const [password,setPassword] = useState("");
    return <div className="bg-slate-300 h-screen flex justify-center ">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"SignIn"} />
                <SubHeading label={"enter your information to create an account"} />

                <InputBox onchange={(e)=>{
                    setusername(e.target.value)
                }} label={"username"} placeholder={"abc@gmail.com"} />
                <InputBox onchange={(e)=>{
                    setPassword(e.target.value)
                }} label={"Password"} placeholder={"123456"} />
                <div className="pt-4">
                    <Button onClick={async()=>{
                       const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                        username,
                        password
                       })
                       localStorage.setItem("token",response.data.token);
                       navigate("/dashboard");

                    }} label={"SignIn"} />
                </div>
                <BottomWarning label={"Don't have an account ?"} buttonText={"SignUp"} to={"/signup"} />

            </div>

        </div>

    </div>
}

export default SignIn