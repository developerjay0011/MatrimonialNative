import { getData, postData } from '../../api/apiRequest';

const SEARCH_ENDPOINTS = {
    ADVANCED_SEARCH: 'search',
    GET_FILTER_OPTIONS: 'search/filters/options',
    QUICK_SEARCH: 'search/quick',
};

export interface SearchFilters {
    ageMin?: number;
    ageMax?: number;
    heightMin?: number;
    heightMax?: number;
    maritalStatus?: string[];
    education?: string[];
    location?: string[];
    page?: number;
    limit?: number;
}

export const advancedSearch = async (filters: SearchFilters) => {
    try {
        const response = await postData(SEARCH_ENDPOINTS.ADVANCED_SEARCH, {
            data: filters,
            showConsole: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getFilterOptions = async () => {
    try {
        const response = await getData(SEARCH_ENDPOINTS.GET_FILTER_OPTIONS, { showConsole: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const quickSearch = async (query: string) => {
    try {
        const response = await getData(SEARCH_ENDPOINTS.QUICK_SEARCH, {
            params: { q: query },
            showConsole: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
