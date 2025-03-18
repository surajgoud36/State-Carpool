// Input should be a date in the format yyyy-mm-dd and returns mm/dd/yyyy
export  const dateFormatter = (inputDate) => {
    let dateString = inputDate;
    var dateParts = dateString.match(/(\d+)/g);
    const month = dateParts[1];
    const day = dateParts[2];
    const year = dateParts[0];
    return `${month}/${day}/${year}`;
}

export const nameFormatter = (name) => {
    if(name === undefined || name === null)
        return;
    let formattedName = "";
    let str = "";
    for(let i = 0; i < name.length; i++) {
        if(name[i] === " ") {
            formattedName += str + " ";
            str = "";
        }
        else {
            if(str === "")
                str += name[i].toUpperCase();
            else
                str += name[i].toLowerCase();
        }
    }

    if(str.length > 0)
        formattedName += str;
    return formattedName;
}

function isDigit(char) {
    const charCode = char.charCodeAt(0);
    return charCode >= 48 && charCode <= 57; 
}

export const parseAddressParts = (address) => {
    const delimiter = ",";
    const indexOfStreet = address.indexOf(delimiter);
    const indexOfCity = address.indexOf(delimiter, indexOfStreet+1);
    
    let street = address.substring(0, indexOfStreet);
    let city = address.substring(indexOfStreet+2, indexOfCity);
    let state = "";
    let zipcode = "";

    let i = indexOfCity+2;
    while(i < address.length) {
        if(isDigit(address[i])) {
            break;
        }
        state += address[i];
        i++;
    }
    state = state.slice(0,-1);

    while(i < address.length) {
        if(isDigit(address[i]))
            zipcode += address[i];
        i++;
    }
    return [street, city, state, zipcode];
}

export const timeStringToDate = (timeString) => {
    const[time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');

    if(hours === '12') {
        hours = '0';
    }

    if(modifier?.toUpperCase() === "PM") {
        hours = parseInt(hours, 10) + 12;
    }

    hours = String(hours).padStart(2, '0');

    return new Date(Date.parse(`2024-12-31T${hours}:${minutes}:00Z`));
}

export const compareByPickupTimes = (a, b) => {
    const dateA = timeStringToDate(a.pickupTime);
    const dateB = timeStringToDate(b.pickupTime);

    if(dateA < dateB) return -1;
    if(dateA > dateB) return 1;
    return 0;
}

export const compareByDropoffTimes = (a, b) => {
    const dateA = timeStringToDate(a.dropoffTime);
    const dateB = timeStringToDate(b.dropoffTime);

    if(dateA < dateB) return -1;
    if(dateA > dateB) return 1;
    return 0;
}