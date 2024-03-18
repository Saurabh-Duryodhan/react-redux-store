import React, { useState } from 'react'

import { Form, redirect, useLocation } from 'react-router-dom';


const ExtraFields = () =>
    <>
        <label htmlFor='Username'>Username</label> <br />
        <input type='text' name='username' required /> <br />
    </>

export const Forms = () => {
    const { pathname } = useLocation()

    const [innerButton, setInnerButton] = useState(pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2))
    const [outterButton, setOutterButton] = useState('Signup')

    function setLabels(pathName) {
        if (pathName === 'Login') {
            setInnerButton('Login')
            setOutterButton('Signup')
        } else if (pathName === 'Signup') {
            setInnerButton('Signup')
            setOutterButton('Login')
        }
    }

    return (
        <>
            <h1>User {innerButton}</h1>
            <Form method='POST' action='/login' style={{ border: '1px solid gray', padding: '2.5em' }}>
                {innerButton !== 'Login' ? <ExtraFields /> : ''}
                <label htmlFor="email">Email</label>
                <br />
                <input type="mail" name="email" required />
                <br />
                <label htmlFor='password'>Password</label>
                <br />
                <input type='password' name='password' required />
                <br />
                <button type="submit">{innerButton}</button>
            </Form>
            {/* <button onClick={() => setLabels(outterButton)}>{outterButton}</button> */}
        </>
    )
}

export async function action({ request }) {
    //In this function we cant use functionality form redux it is act like backend
    try {      
        const data = await request.formData();
        const formData = await Object.fromEntries(data);
        localStorage.setItem('user', JSON.stringify(formData))
        return redirect('/')
    } catch (error) {
        throw new Error('Please try again')
    }
}