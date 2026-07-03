import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../Firebase/firebase.init";


const AuthProvider = ({ children }) => {

    const registerUser= (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const singInUser= (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const authInfo = {
        // Add any authentication-related state or functions here
        registerUser,
        singInUser
    };
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;