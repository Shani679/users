export const isValidEmail = (value) => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(value)
}

export const checkImageURL = url => {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

const properName = (name) => {
    return name.toLowerCase().replace(/\s/g, '');
};

export const calculateMatch = (per1, per2) => {
    const firstLowerCaseName = properName(per1.fullName);
    const secondLowerCaseName = properName(per2.fullName);
    const bothNames = firstLowerCaseName + secondLowerCaseName;
    let stringScore = 0;
    let alreadyPassedChars = [];

    for (let currIndex = 0; currIndex < firstLowerCaseName.length; currIndex++) {
        if (!alreadyPassedChars.includes(firstLowerCaseName[currIndex])) {
            if (secondLowerCaseName.includes(firstLowerCaseName[currIndex])) {
                const charInstancesCount = bothNames.split(firstLowerCaseName[currIndex]).length - 1;
                stringScore += charInstancesCount;
                alreadyPassedChars.push(firstLowerCaseName[currIndex]);
            }
        }
    }

    const ageScore = Math.abs(per1.age - per2.age);

    const finalScore = stringScore / (ageScore / 10);
    return finalScore;
};