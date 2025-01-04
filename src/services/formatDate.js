export const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  if (isNaN(date)) {
    return "Invalid Date"; // Handle the invalid date case
  }
  
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};