import { Platform } from "react-native";

export const customArray = (exampleObject = {}) => {
    var listdata = Object.entries(exampleObject).map(([key, value]) => ({ key, value, }));
    listdata = listdata?.filter((i) => i?.value != undefined)
    return Array.isArray(listdata) ? listdata : []
}

export const prepareFileForUpload = (file, fieldName = 'file', formData) => {
    try {
        var path = file?.uri || file?.image
        if (!path || !file?.type || !file?.name) {
            return null;
        }
        const fileObject = {
            uri: Platform.OS === 'android' ? path : path.replace('file://', ''),
            type: file.type,
            name: file.name
        };

        formData.append(fieldName, fileObject);
        return formData;
    } catch (error) {
        return null;
    }
};

export const getMonthYearList = (startDate, endDate) => {
    const months = [
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 },
    ]

    const start = new Date(startDate);
    const end = new Date(endDate);
    const list = [];

    for (let date = new Date(start); date <= end; date.setMonth(date.getMonth() + 1)) {
        const month = months.find((item) => item?.value == date.getMonth() + 1);
        const year = date.getFullYear();
        list.push({
            month: month?.value,
            year: year,
            label: `${month?.label} - ${year}`,
            value: `${month?.value}_${year}`
        });
    }

    return list;
};

