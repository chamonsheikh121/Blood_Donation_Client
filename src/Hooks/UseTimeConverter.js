

export const UseTimeConverter = (time) => {
// console.log(time);
    // Split the time into hours and minutes
    let [hours, minutes] = time.split(':').map(Number);

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12; // If hours = 0 (midnight) or 12 (noon), it should be 12 in 12-hour format

    // Format the time as hh:mm AM/PM
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
};


