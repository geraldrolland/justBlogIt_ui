import React from 'react'
import axios from 'axios'
const UseMutationFunc = (method) => {
    if (method === "get") {
        const mutationFunc = async (url) => {
            try {
                const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
                const config = {
                    headers: {
                        Authorization: "Bearer " + userStatus.access
                    }
                }
                const response = await axios.get(url, config)
                if (response.status === 200)
                return response.data
            }
            catch(error) {
                if (error.response.status === 401) {
                    const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
                    if (userStatus && userStatus.refresh) {
                        try {
                            const response = axios.post("http://127.0.0.1:8000/token-refresh/", {refresh: userStatus.refresh})
                            if (response.status === 200) {
                                userStatus.access = response.data.access
                                sessionStorage.setItem("userStatus", JSON.stringify(userStatus))
                                const config = {
                                    headers: {
                                        Authorization: "Bearer " + response.data.access
                                    }
                                }
                                try {
                                    const response = await axios.get(url, config)
                                    if (response.status === 200) {
                                        return response.data
                                    }
                                    else {
                                        throw new Error("could not authenticate")
                                    }
                                }
                                catch(error) {
                                    throw new Error("something went wrong")
                                }
                            }
                        }
                        catch(error) {
                            throw new Error("could not refresh access token")
                        }
                    }
                }
                else {
                    throw new Error("something went wrong")
                }
            }

        }

        return mutationFunc
    }


    else if (method === "post") {
        console.log("post is set")
        const mutationFunc = async (url, data) => {
            try {
                console.log("tried")
                const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
                const config = {
                    headers: {
                        Authorization: "Bearer " + userStatus.access
                    }
                }
                console.log("this is the point")
                const response = await axios.post(url, data, config)
                if (response.status === 200 || response.status === 201)
                return response.data
            }
            catch(error) {
                if (error?.response?.status === 401) {
                    const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
                    if (userStatus && userStatus.refresh) {
                        try {
                            const response = axios.post("http://127.0.0.1:8000/token-refresh/", {refresh: userStatus.refresh})
                            if (response.status === 200) {
                                userStatus.access = response.data.access
                                sessionStorage.setItem("userStatus", JSON.stringify(userStatus))
                                const config = {
                                    headers: {
                                        Authorization: "Bearer " + response.data.access
                                    }
                                }
                                try {
                                    const response = await axios.get(url, data,  config)
                                    if (response.status === 200) {
                                        return response.data
                                    }
                                    else {
                                        throw new Error("could not authenticate")
                                    }
                                }
                                catch(error) {
                                    throw new Error("something went wrong")
                                }
                            }
                        }
                        catch(error) {
                            throw new Error("could not refresh access token")
                        }
                    }
                }
                else {
                    console.log(error)
                    throw new Error("something went wrong")
                }
            }

        }

        return mutationFunc
    }

    
    else {
        throw new Error("parameters not fully parsed")
    }
}
export default UseMutationFunc