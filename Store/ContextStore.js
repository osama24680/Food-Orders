import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios"
import joi from "joi"
import { useRouter } from "next/router"
import { setCookie, deleteCookie } from 'cookies-next';



export let FoodContext = createContext(0)
export function FoodContextProvider({ children }) {

    const [joiErrors, setJoiErrors] = useState({})
    const [registered, setRegistered] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [formDataLogin, setFormDataLogin] = useState({})
    const [logginName, setLogginName] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [opened, setOpened] = useState(false)
    const [pizzas, setPizzas] = useState([])
    const [allQuantity, setAllQuantity] = useState(0)
    const [q, setQ] = useState(0)

    let router = useRouter()




    // ***********************Register*******************************

    function handleInput(e) {
        let tempValues = { ...formData }
        tempValues[e.target.name] = e.target.value
        setFormData(tempValues)
    }


    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        let validateResult = validateForm(formData)
        let listErrors = {};
        setJoiErrors(listErrors)
        if (validateResult.error) {
            for (let item of validateResult.error.details) {
                listErrors[item.path[0]] = item.message
            }
        } else {
            let { data } = await axios.post(`https://routeegypt.herokuapp.com/signup`, formData)
            console.log(data)
            if (data.message === "success") {
                router.push("/LogIn")
            } else {
                console.log(data.errors)
                setRegistered(data.errors?.email.message)
            }
        }
        setIsLoading(false)
    }

    function validProps(type) {
        let objectProps = {
            'string.base': `${type} should be a type of 'text'`,
            'string.empty': `${type} cannot be an empty field`,
            'string.min': `${type} should have a minimum length of {#limit}`,
            'string.max': `${type} should have a maximum length of {#limit}`,
            'any.required': `${type} is a required field`,
        }
        return objectProps;
    }

    const validateForm = (formData) => {
        let schema = joi.object({
            first_name: joi.string().label("First Name").pattern(/[A-Za-z]/).min(3).max(8).required().messages(
                validProps("First Name")
            ),
            last_name: joi.string().alphanum().min(3).max(8).required().messages(
                validProps("Last Name")
            ),
            age: joi.number().min(16).max(60).required().messages({
                'number.base': `Age should be a type of 'number'`,
                'number.empty': `Age cannot be an empty field`,
                'number.min': `minimum age is {#limit}`,
                'number.max': `maximum age is {#limit}`,
                'any.required': `Age is a required field`,
            }),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).messages({
                'string.base': `Email should be a type of 'text'`,
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`,
            }),
            password: joi.string().alphanum().pattern(/[A-Za-z0-9]{5}/).messages({
                'string.empty': `Password cannot be an empty field`,
                'string.min': `Password should have a minimum length of {#limit}`,
                'any.required': `Password is a required field`,
                'string.pattern.base': "passwords should be letters and numbers only"
            }),
        })
        return schema.validate(formData, { abortEarly: false })
    }


    // ***********************Log In*******************************
    async function handleSubmitLogin(e) {
        e.preventDefault()
        setIsLoading(true)
        let validateResult = validateFormLogin(formDataLogin)
        let listErrors = {};
        setJoiErrors(listErrors)
        if (validateResult.error) {
            for (let item of validateResult.error.details) {
                listErrors[item.path[0]] = item.message
            }
        } else {
            let { data } = await axios.post(`https://routeegypt.herokuapp.com/signin`, formDataLogin)

            if (data.message === "success") {
                setLogginName(`${data.user.first_name}` + " " + `${data.user.last_name}`)
                setCookie("tokenFood", data.token)
                setCookie("userFood", data.user)
                console.log(data)
                router.push("/")
                setIsLoggedIn(true)
            } else {
                console.log(data.errors)
                setRegistered(data.message)
            }
        }
        setIsLoading(false)

    }

    const validateFormLogin = (formDataLogin) => {
        let schema = joi.object({

            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).messages({
                'string.base': `Email should be a type of 'text'`,
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`,
            }),
            password: joi.string().alphanum().pattern(/[A-Za-z0-9]{5}/).messages({
                'string.empty': `Password cannot be an empty field`,
                'string.min': `Password should have a minimum length of {#limit}`,
                'any.required': `Password is a required field`,
                'string.pattern.base': "passwords should be letters and numbers only"
            }),
        })
        return schema.validate(formDataLogin, { abortEarly: false })
    }

    function handleInputLogin(e) {
        let tempValues = { ...formDataLogin }
        tempValues[e.target.name] = e.target.value
        setFormDataLogin(tempValues)
    }

    // ***********************Log Out*******************************
    function logOut() {
        setLogginName(null)
        router.push("/LogIn")
        setIsLoggedIn(false)
        setOpened(o => !o)
        deleteCookie("tokenFood")
        deleteCookie("userFood")

    }

    // ***********************Cart ********************************

    function addPizza(data) {
        let productAdd = data
        if (pizzas.length === 0) {
            let newItems = [productAdd]
            setPizzas(newItems)

        } else if (pizzas.length > 0) {
            let existItem = pizzas.find(element => (element._id === productAdd._id) && (element.size === productAdd.size))

            if (existItem) {
                let indexItem = pizzas.indexOf(existItem)
                pizzas[indexItem].quantity = pizzas[indexItem].quantity + productAdd.quantity

            } else {
                let newItems = [...pizzas, { ...productAdd }]
                setPizzas(newItems)
            }
        }
    }

    function removePizza(index) {
        const q = setPizzas(pizzas.filter((_, i) => i !== index))
        setAllQuantity(q)
    }

    function resetCar() {
        setPizzas([])

    }

    let values = {
        name: "osama megahed",
        joiErrors,
        registered,
        isLoading,
        handleSubmit,
        handleInput,
        handleSubmitLogin,
        handleInputLogin,
        logginName,
        isLoggedIn,
        logOut,
        opened,
        setOpened,
        addPizza,
        pizzas,
        removePizza,
        resetCar,
        allQuantity,
        q,

    }

    return (
        <FoodContext.Provider value={values}>
            {children}
        </FoodContext.Provider>
    )
}

