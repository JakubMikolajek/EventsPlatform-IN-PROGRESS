import moment from "moment/moment";

export const formatDate = (event: any) => {
    const e_date: moment.Moment = moment(event?.event_date);
    const date_format: string = e_date.format("DD-MM-YYYY");
    const time: string = e_date.format("HH:mm");

    return [date_format, time].join(" ");
};

export const formatDateToCheck = (event: any) => {
    const e_date: moment.Moment = moment(event?.event_date);
    const date_format_to_check: string = e_date.format("YYYY-MM-DD");
    const time: string = e_date.format("HH:mm");

    return [date_format_to_check, time].join(" ");
};
