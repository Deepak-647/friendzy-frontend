export const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return `${hours}:${minutes} ${ampm} | ${day}-${month}-${year}`;
  };