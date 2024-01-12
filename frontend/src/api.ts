export async function query(data: { inputs: string }): Promise<Blob> {
    const API_TOKEN = "key"; // Replace with your Hugging Face API token
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed with status ${response.status}. ${errorText}`);
      }
  
      const result = await response.blob();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to allow the component to handle it
    }
  }
  