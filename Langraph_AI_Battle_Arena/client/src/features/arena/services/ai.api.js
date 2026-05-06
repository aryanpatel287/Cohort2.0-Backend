import axios from 'axios';

export async function invokeAi({ problem }) {
    console.log(problem);

    const response = await axios.post('http://localhost:3000/invoke', {
        problem,
    });

    return response.data;
}
