
export const formatDate = (sourceDate: Date) =>  {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat(undefined, options).format(new Date(sourceDate));
};