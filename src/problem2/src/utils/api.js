import axios from 'axios';

const PRICES_URL = 'https://interview.switcheo.com/prices.json';

export const fetchPrices = async () => {
    try {
        const response = await axios.get(PRICES_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching prices:', error);
        throw error;
    }
};
