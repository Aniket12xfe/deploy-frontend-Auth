import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';
const LOGIN_URL = `${BASE_URL}token/`;
const REFRESH_URL = `${BASE_URL}token/refresh/`;
const NOTES_URL = `${BASE_URL}note/`;

export const login = async (username, password) => {
    const response = await axios.post(LOGIN_URL,
        {
            username: username,
            password: password
        },
        {
            withCredentials: true
        }
    )
    return response.data.success;
}

export const refresh = async () => {
    try {
        await axios.post(REFRESH_URL,
            {},
            {
                withCredentials: true
            }
        )
        return true;
    } catch (error) {
        return false;
    }
}

export const get_notes = async () => {
    try {
        const response = await axios.get(NOTES_URL, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        return call_refresh(error, axios.get(NOTES_URL, { withCredentials: true }));
    }
}

const call_refresh = async (error, func) => {
    if (error.response && error.response.status === 401) {
        const refreshed = await refresh();
        if (refreshed) {
            const RetryRefresh = await func();
            return RetryRefresh;
        }
    }
    return error.response;
}