import {collection, getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase/firebase";

export default async function TestPage() {
    const users  = await getDocs(collection(db, "users"));

    return (
        <div>
            {users.docs.map((doc) => (
                <p key={doc.id}>{JSON.stringify(doc.data())}</p>
            ))}
        </div>
    );
}