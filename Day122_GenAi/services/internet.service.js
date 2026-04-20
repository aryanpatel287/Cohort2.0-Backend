import { tavily } from '@tavily/core';

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function searchWeb(query) {
    console.log('searchWeb called');

    const response = await tvly.search(query, {
        searchDepth: 'basic',
    });

    const searchResults = response.results[0];
    // console.log('type of results: ', typeof searchResults.content);

    return searchResults.content;
}
