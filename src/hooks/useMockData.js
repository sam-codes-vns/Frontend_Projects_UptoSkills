import { useEffect, useState } from "react";
import mockData from "../data/mockData.json"; // path adjust karo

export default function useMockData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(mockData); // directly imported JSON set kar diya
  }, []);

  return data;
}
