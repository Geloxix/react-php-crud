//shadncn ui
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

//types
import { UserTypes } from "@/constants/types";

//components
import EditUserInfo from "./EditUserInfo";
import Confirmation from "./Confirmation";

//zustand
import { usefetchUserStore } from "@/features/hooks/store";

import axios from "@/api/axios";
interface UsersListsProps {
    users: UserTypes[];
};
const UsersLists = ({ users }: UsersListsProps ) => {

    const { fetchUsers } = usefetchUserStore();

    const handleDeleteUser = async(id: number) => {

        try {
            const response = await axios.delete(`/deleteUser.php?id=${id}`);
            console.log(response.data.message);
            fetchUsers();
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data.message); 
            } else {
                console.log('Ann error occured during request');
            }
        }
    };

    return (
        <Table className="bg-black text-white px-4">
            <TableHeader className="w-full px-5">
                <TableRow className="text-[1rem]">
                    <TableHead>ID</TableHead>
                    <TableHead>Firstname</TableHead>
                    <TableHead>Lastname</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-end">control</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="font-afacad-flux text-[1rem]">
                {
                    users.map((user: UserTypes) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell className="">{user.email}</TableCell>
                            <TableCell className="text-end">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="bg-green-500">Update</Button>
                                    </DialogTrigger>
                                    <EditUserInfo user={user} />
                                </Dialog>
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button className="ml-3 bg-red-500">Delete</Button>
                                    </AlertDialogTrigger>
                                    <Confirmation id={user.id} handleDeleteUser={handleDeleteUser}/>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default UsersLists;
