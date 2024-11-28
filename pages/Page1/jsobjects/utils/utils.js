export default {
  formatBirthday: (birthday) => {
    if (!birthday) {
      return "Дата не вказана"; // Return a default message if birthday is undefined or null
    }
    
    const date = new Date(birthday);
    
    // Check if the date is invalid
    if (isNaN(date.getTime())) {
      return "Невірний формат дати"; // Return an error message if the date is invalid
    }
    
    const months = [
      "січня", "лютого", "березня", "квітня", "травня", "червня", 
      "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    
    return `${day} ${month}`;
  }
};


