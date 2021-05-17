let baseAPI = ""
if (process.env.NODE_ENV === 'production') {
    baseAPI = "https://localhost:44333/api/v1"
} else {
    baseAPI = "https://localhost:44333/api/v1"
}

export const baseURL = baseAPI