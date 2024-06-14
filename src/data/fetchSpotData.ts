export const fetchSpotData = async (data) => {
  const token =
    '516ca8844a07ccbd380cbf9b4255dc7d0449a8805b55fdd525743eea31bfb054';
  const requestBody = {
    text: data.text,
    'save-text': data.save_data,
    'test-train': 0,
    'cutoff-lower': 0.25,
    'cutoff-pred': 0.5,
    'cutoff-upper': 0.5,
  };
  const response = await fetch(
    'https://spot.suffolklitlab.org/v0/entities-nested/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
