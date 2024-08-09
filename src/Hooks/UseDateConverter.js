

export const UseDateConverter = (dateConstructor) => {
    console.log(dateConstructor);
    const dateTh = dateConstructor.getDate()
        const weekDay = dateConstructor.getDay()
        const month = dateConstructor.getMonth();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const newMonth = monthNames[month];
        let suffix;
        switch (dateTh){
            case 1:
                suffix = 'st';
                break
            case 2:
                suffix = 'nd';
                break
            case 3:
                suffix = 'rd';
                break
            default:
                suffix = 'th'
        }
        let day;
        switch (weekDay){
            case 0:
                day = 'Sunday';
                break
            case 1:
                day = 'Monday';
                break
            case 2:
                day = 'Tuesday';
                break
            case 3:
                day = 'Wednesday';
                break
            case 4:
                day = 'Thursday';
                break
            case 5:
                day = 'Friday';
                break
            case 6:
                day = 'Saterday';
                break
        }
        const date = `${day} , ${dateTh}${suffix} ${newMonth} ${dateConstructor.getFullYear()}`
        return date;
};

