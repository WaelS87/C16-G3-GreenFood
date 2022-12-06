import React from 'react'
import { json } from 'sequelize';

export const UseFetch = async (endpoint, method = "GET", data, token) => {
    
    const apiUrlBase = process.env.REACT_APP_API_URL_BASE;
    const urlBase = apiUrlBase + endpoint;

    let response;

    if(METHOD === "GET") {
        response = await fetch(url)
    }

    if(METHOD === "POST") {
        response = await fetch(url, {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-type" : "aplication/json",
                Authorization : token
            }
        })
    }

    let result = await response.json();

    return result 
  
}

export default UseFetch
