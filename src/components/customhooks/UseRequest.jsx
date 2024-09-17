import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { queryClient } from '../../App';
import { useNavigate } from 'react-router-dom';
const UseRequest = (url, method = "get", data = null, key = null, enabled = true) => {
    const navigateToLogin = useNavigate()
    if (method === "get" && data === null && key !== "") {
    const fetchFunc = async () => {
        try {
            const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
            let config = {
                headers: {
                    Authorization: "Bearer " + userStatus.access
                }
            }
            const response = await axios.get(url, config);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                const userStatus = JSON.parse(sessionStorage.getItem("userStatus"));
                if (userStatus && userStatus.refresh) {
                    try {
                        const refreshResponse = await axios.post("http://127.0.0.1:8000/token-refresh/", { refresh: userStatus.refresh });
                        if (refreshResponse.status === 200) {
                            userStatus.access = refreshResponse.data.access;
                            sessionStorage.setItem("userStatus", JSON.stringify(userStatus));
                            const config = {
                                headers: {
                                    Authorization: "Bearer " + userStatus.access,
                                },
                            };
                            const retryResponse = await axios.get(url, config);
                            if (retryResponse.status === 200) {
                                console.log(response.data)
                                return retryResponse.data;
                            }
                        }
                    } catch (refreshError) {
                        navigateToLogin("/log-in/")
                        throw new Error("Failed to refresh token.");
                    }
                }
            } else {
                throw new Error("Request failed.");
            }
        }
    };


    const queryResult = useQuery({
        queryKey: [key],
        queryFn: fetchFunc,
        initialData: () => {
            const data = queryClient.getQueryData([key])
            if (data) {
                return data
            }
        },
        enabled,
        refetchInterval: 1000,
    });

    return queryResult;
    }

    if (method === "post" && data !== null && enabled === true && key !== "") {
        console.log(data)
        const navigateToUserProfile = useNavigate()
        const postFunc = async () => {
            try {
                const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
                let config = {
                    headers: {
                        Authorization: "Bearer " + userStatus.access
                    }
                }
                const response = await axios.post(url, data, config);
                if (response.status === 200 || response.status === 201) {
                    if (key === "userprofileupdate") {
                        const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
                        console.log(userStatus)
                        console.log("from request")
                        for (let key in data) {
                            if (userStatus.hasOwnProperty(key)) {
                                userStatus[key] = data[key]
                            }
                        }
                        sessionStorage.setItem("userStatus", JSON.stringify(userStatus))
                    }
                   
                    return response.data;
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    const userStatus = JSON.parse(sessionStorage.getItem("userStatus"));
                    if (userStatus && userStatus.refresh) {
                        try {
                            const refreshResponse = await axios.post("http://127.0.0.1:8000/token-refresh/", { refresh: userStatus.refresh });
                            if (refreshResponse.status === 200) {
                                userStatus.access = refreshResponse.data.access;
                                sessionStorage.setItem("userStatus", JSON.stringify(userStatus));
                                const config = {
                                    headers: {
                                        Authorization: "Bearer " + userStatus.access,
                                    },
                                };
                                const retryResponse = await axios.post(url, data, config);
                                if (retryResponse.status === 200) {
                                    console.log("from userequest")
                                    if (key === "userprofileupdate") {
                                        console.log("from userequest")
                                        const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
                                        for (let key in data) {
                                            if (userStatus.hasOwnProperty(key)) {
                                                userStatus[key] = data[key]
                                            }
                                        }
                                        sessionStorage.setItem("me", "hello")
                                        sessionStorage.setItem("userStatus", JSON.stringify(userStatus))
                                    }
                                    return retryResponse.data;
                                }
                            }
                        } catch (refreshError) {
                            navigateToLogin("log-in")
                            throw new Error("Failed to refresh token.");
                        }
                    }
                } else {
                    console.log(error)
                    throw new Error("Request failed.");
                }
            }
        };
    
    
        const mutationResult = useMutation({
            mutationKey: [key],
            mutationFn: postFunc,
            onSuccess: () => {
                if (key === "userprofileupdate") {
                    navigateToUserProfile("/home/user-profile/")
                }

            }
        })
        return mutationResult;
    }

    if (method === "delete" && data === null) {
        console.log("this is delete post")
        const deleteFunc = async () => {
            try {
                const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
                let config = {
                    headers: {
                        Authorization: "Bearer " + userStatus.access
                    }
                }
                const response = await axios.delete(url, config);
                if (response.status === 200 || response.status === 201) {
                    if (key === "userprofileupdate") {
                        const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
                        console.log(userStatus)
                        console.log("from request")
                        for (let key in data) {
                            if (userStatus.hasOwnProperty(key)) {
                                userStatus[key] = data[key]
                            }
                        }
                        sessionStorage.setItem("userStatus", JSON.stringify(userStatus))
                    }
                   
                    return response.data;
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    const userStatus = JSON.parse(sessionStorage.getItem("userStatus"));
                    if (userStatus && userStatus.refresh) {
                        try {
                            const refreshResponse = await axios.post("http://127.0.0.1:8000/token-refresh/", { refresh: userStatus.refresh });
                            if (refreshResponse.status === 200) {
                                userStatus.access = refreshResponse.data.access;
                                sessionStorage.setItem("userStatus", JSON.stringify(userStatus));
                                const config = {
                                    headers: {
                                        Authorization: "Bearer " + userStatus.access,
                                    },
                                };
                                const retryResponse = await axios.delete(url, config);
                                if (retryResponse.status === 200) {
                                    console.log("from userequest")
                                    if (key === "userprofileupdate") {
                                        console.log("from userequest")
                                        const userStatus = JSON.parse(sessionStorage.getItem("userStatus"))
                                        for (let key in data) {
                                            if (userStatus.hasOwnProperty(key)) {
                                                userStatus[key] = data[key]
                                            }
                                        }
                                        sessionStorage.setItem("me", "hello")
                                        sessionStorage.setItem("userStatus", JSON.stringify(userStatus))
                                    }
                                    return retryResponse.data;
                                }
                            }
                        } catch (refreshError) {
                            navigateToLogin("log-in")
                            throw new Error("Failed to refresh token.");
                        }
                    }
                } else {
                    console.log(error)
                    throw new Error("Request failed.");
                }
            }
        };
    
    
        const mutationResult = useMutation({
            mutationFn: deleteFunc,
        })
        return mutationResult;
    }
};

export default UseRequest