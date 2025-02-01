export const fetchQuizQuestions = async () => {
    try {
        const response = await fetch('https://api.jsonserve.com/Uw5CrX');

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        return null; 
    }
};
