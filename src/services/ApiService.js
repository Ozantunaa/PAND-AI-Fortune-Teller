import { API_URL } from "../constants";

export const getApiData = async (age, feelings, hobbies, name, horoscope) => {
      const response = await fetch(`${API_URL}/generate-fal`, {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify({ age, feelings, hobbies, name, horoscope }),
       })
       return response 
}