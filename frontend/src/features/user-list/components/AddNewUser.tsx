//shadcn library
import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

//hooks
import { FormEvent, useState } from "react";

//customize axios
import axios from "@/api/axios";

//zustand stm
import { usefetchUserStore } from "@/features/hooks/store";

const AddNewUser = () => {

    const { fetchUsers } = usefetchUserStore();

    const [ firstname, setFirstname ] = useState<string>('');
    const [ lastname, setLastname ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const [ msg, setMsg ] = useState<string>('');
    const [ success, setSuccess ] = useState<boolean>(false);


    const handleSubmitNewStudent = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            firstname,
            lastname,
            email, 
            username,
            password
        };

        try {
            const response = await axios.post('/addNewUser.php', data);
            setMsg(response.data.message);
            setSuccess(response.data.success);
            //call the fetch user to rerender new ui
            fetchUsers();
        } catch (error: any) {
            if (error.response) {
                setMsg(error.response.data.message);
            } else {
                setMsg(error.response.data.message);
            }
        }
    };

    return (
        <>
            <DialogContent className="sm:max-w-[425px] px-[2rem]">
                <DialogHeader>
                    <DialogTitle className="text-lg">Add new user</DialogTitle>
                </DialogHeader>
                <form action="" onSubmit={handleSubmitNewStudent}>
                    { msg !== '' ? <p className={`text-center font-afacad-flux py-1 mb-2 ${!success ? 'text-red-600 bg-red-100': 'text-green-500 bg-green-100'}`}>{msg}</p> : null}
                    
                    <div className="signup-inputs-container">
                        <Label htmlFor="firstname" className="text-right">
                            Firstname
                        </Label>
                        <Input
                            id="firstname"
                            className="font-afacad-flux"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="signup-inputs-container">
                        <Label htmlFor="lastname" className="text-right">
                            Lastname
                        </Label>
                        <Input
                            id="lastname"
                            className="font-afacad-flux"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="signup-inputs-container">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            className="font-afacad-flux"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="signup-inputs-container">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            className="font-afacad-flux"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="signup-inputs-container">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            className="font-afacad-flux"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="mt-3 bg-green-600">Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </>
    );
};

export default AddNewUser;
