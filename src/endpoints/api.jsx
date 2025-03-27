import axios from 'axios';

const isDevelopment = process.env.MODE === 'development';
const BASE_URL = isDevelopment ? process.env.REACT_APP_API_BASE_URL_LOCAL : process.env.REACT_APP_API_BASE_URL_DEPLOY;


const LOGIN_URL = `${BASE_URL}token/`;
const REFRESH_URL = `${BASE_URL}token/refresh/`;
const NOTES_URL = `${BASE_URL}note/`;
const LOGOUT_URL = `${BASE_URL}logout/`;
const AUTH_URL = `${BASE_URL}is_authenticated/`;
const REGISTER_URL = `${BASE_URL}register/`;

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
        const response = await axios.post(REFRESH_URL, {}, { withCredentials: true });
        return response.status === 200; // ✅ Return true if refresh successful
    } catch (error) {
        return false; // ❌ If refresh fails, return false
    }
};

// ✅ Function to get notes with automatic token refresh on 401 error
export const get_notes = async () => {
    try {
        const response = await axios.get(NOTES_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        return await call_refresh(error, () => axios.get(NOTES_URL, { withCredentials: true }));
    }
};

// ✅ Function to refresh token and retry the request
const call_refresh = async (error, retryFunc) => {
    if (error.response && error.response.status === 401) {
        const refreshed = await refresh();
        if (refreshed) {
            return await retryFunc(); // ✅ Retry the function after refresh
        }
    }
    throw error; // ❌ If refresh fails, return the original error
};

export const logout = async () => {
    try {
        const response = await axios.post(LOGOUT_URL, {}, {
            withCredentials: true
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

export const is_authenticated = async () => {
    try {
        await axios.post(AUTH_URL, {}, {
            withCredentials: true
        });
        return true;
    } catch (error) {
        return false;
    }
}

export const register = async (username, password, email, firstname, lastname) => {

    const response = await axios.post(REGISTER_URL, {
        username: username,
        password: password,
        email: email,
        first_name: firstname,
        last_name: lastname
    }, {
        withCredentials: true
    });
    return response.data.success;

}