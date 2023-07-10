export const getOpenEvents = (events: any) => {
    const events_sort_by_date = events?.sort((a: any, b: any) => {
        const date_a: any = new Date(a.event_date);
        const date_b: any = new Date(b.event_date);

        return date_a - date_b;
    });

    return events_sort_by_date?.filter((event: any) => {
        const currentDate = new Date();
        const e_date: any = new Date(event.event_date);
        return e_date >= currentDate;
    });
};

export const getCategoriesOfEvents = (
    events: any
) => {
    const categories = events?.map((event: any) => {
        return event.event_category;
    });

    return [...new Set(categories)];
};
