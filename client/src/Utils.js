export function formatDate(date_input) {
    const date = new Date(Date.parse(date_input))
    const formatter = new Intl.DateTimeFormat("en-US",
        {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }
    )
    return formatter.format(date)
}