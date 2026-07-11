export const fetchLocation = async (): Promise<string> => {
  try {
    const response = await fetch("http://ip-api.com/json/?fields=countryCode", {
      next: { revalidate: 3600 },
    });
    const location = await response.json();
    return location.countryCode?.toLowerCase() ?? "us";
  } catch (error) {
    console.error("Location detection failed:", error);
    return "us";
  }
};

export const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page } = filters;

  const params = new URLSearchParams({ query, page, num_pages: "1" });

  const headers = {
    "X-RapidAPI-Key": process.env.JSEARCH_API_KEY ?? "",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search-v2?${params.toString()}`,
    { headers, next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`JSearch request failed: ${response.status}`);
  }

  const result = await response.json();

  return result.data;
};