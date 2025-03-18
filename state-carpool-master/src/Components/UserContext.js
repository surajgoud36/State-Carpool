import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    // Currently logged in role 
    const [role, setRole] = useState(() => {
        const storedRole = localStorage.getItem('role');
        return storedRole ? JSON.parse(storedRole) : null;
    })

    useEffect(() => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
        else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if(role) {
            localStorage.setItem('role', JSON.stringify(role));
        }
        else {
            localStorage.removeItem('role');
        }
    }, [role])

    const updateUser = (newUser) => {
        console.log("from UserContext : " + newUser);
        setUser(newUser);
    }

    const updateRole = (newRole) => {
        console.log("Logged in as : " + newRole);
        setRole(newRole);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{user, updateUser, role, updateRole, logout}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
}