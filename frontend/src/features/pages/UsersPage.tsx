import { Link } from "react-router-dom";

//remix icon
import { RiAddLine } from "@remixicon/react";

//components
import UsersLists from "../user-list/components/UsersLists";
import AddNewUser from "../user-list/components/AddNewUser";

//types
import { UserTypes } from "@/constants/types";

//shadcn
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface UsersPageProps {
    users: UserTypes[];
}
const UsersPage = ({ users }: UsersPageProps) => {
    return (
        <section className="font-afacad-flux text-[1rem] bg-black h-screen text-white">
            <header className="h-[80px] flex items-center justify-between px-[8rem]">
                <Link to="/" className="ml-3 my-4">Home</Link>
                <Dialog >
                    <DialogTrigger asChild>
                         <button className="bg-green-500 flex items-center justify-center py-1 px-8 rounded-md">
                            new user
                            <span className="ml-2"><RiAddLine size={18} /></span>
                        </button>
                    </DialogTrigger>
                    <AddNewUser />
                </Dialog>
               
            </header>
            
            <div className="mt-4 px-4">
                <h1 className="text-[1.2rem] mb-2 ml-2">Users</h1>
                <UsersLists users={users} />
            </div>
            
        </section>
    );
};

export default UsersPage;
