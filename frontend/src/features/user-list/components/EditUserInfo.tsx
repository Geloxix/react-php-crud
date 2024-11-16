//shadcn ui
import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

//react imports
import { FormEvent, useState } from "react";

//types
import { UserTypes } from "@/constants/types";

//zustand stm
import { usefetchUserStore } from "@/features/hooks/store";

import axios from "@/api/axios";

interface EditUserInfoProps {
    user: UserTypes;
};
    
const EditUserInfo = ({ user }: EditUserInfoProps) => {

    const { fetchUsers } = usefetchUserStore();
    const [ firstname, setFirstname ] = useState<string>(user.first_name);
    const [ lastname, setLastname ] = useState<string>(user.last_name);
    const [ email, setEmail ] = useState<string>(user.email);
    const [ msg, setMsg ] = useState<string>('');

    const handleSubmitUpdate = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMsg('');

        const data = {
            id: user.id,
            firstname: firstname === '' ? user.first_name : firstname,
            lastname: lastname === '' ? user.last_name : lastname,
            email: email === '' ? user.email : email
        };

        try {
            const response = await axios.patch('/updateUser.php', data);
            setMsg(response.data.message);
            fetchUsers();
        } catch (error: any) {
            if (error.response) {
                setMsg(error.response.message);
            } else {
                setMsg('Ann error occured during request');
            }
        }
    };

    console.log(msg);
    
    
    
    return (
        <>
            <DialogContent className="sm:max-w-[425px] font-afacad-flux">
                <DialogHeader>
                    <DialogTitle>Edit User info</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmitUpdate}>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="firstname" className="text-right">
                            Firstname
                        </Label>
                        <Input
                            id="firstname"
                            className="col-span-3"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastname" className="text-right">
                            Lastname
                        </Label>
                        <Input
                            id="lastname"
                            className="col-span-3"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            className="col-span-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
                
            </DialogContent>
        </>
    );
};

export default EditUserInfo;
