export const fetchSeasonEpisodes = async (showId, seasonIndex) => {
    try {
      const response = await fetch(`/api/shows/${showId}/seasons/${seasonIndex}`);
      if (!response.ok) {
        throw new Error(`Error fetching episodes: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  