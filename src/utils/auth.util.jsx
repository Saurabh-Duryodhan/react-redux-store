import { redirect, useNavigate } from "react-router-dom"

export const authProtector = () => {
    const user = localStorage.getItem('user')
    const parsedUser = JSON.parse(user)
    if (!parsedUser.email) {
        return redirect('/')
    } else {
        return
    }
}

export const checkAuthUser = () => {
    const user = localStorage.getItem('user')
    const parsedUser = JSON.parse(user)
    // if(!parsedUser){
    //     return redirect('/login')
    // }
    return parsedUser
}