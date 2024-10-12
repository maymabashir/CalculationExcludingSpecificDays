function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    // Parse the input dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Function to check if a date is a Friday (5 is Friday in getDay())
    const isFriday = (date) => date.getDay() === 5;

    // Function to calculate the number of days excluding Fridays in a given month
    function getWorkingDaysInMonth(year, month) {
        let workingDays = 0;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            if (!isFriday(currentDate)) {
                workingDays++;
            }
        }
        return workingDays;
    }

    // Function to calculate working days excluding Fridays between two dates in a month
    function getWorkingDaysInRange(startDate, endDate) {
        let workingDays = 0;
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (!isFriday(currentDate)) {
                workingDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return workingDays;
    }

    let totalWorkingDays = 0;
    let daysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];

    let current = new Date(start);

    while (current <= end) {
        const year = current.getFullYear();
        const month = current.getMonth();

        // Get the total working days excluding Fridays for the current month
        const workingDaysInMonth = getWorkingDaysInMonth(year, month);
        daysExcludingFridays.push(workingDaysInMonth);

        // Calculate the range of days to consider for this month
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const monthStart = current > firstDayOfMonth ? current : firstDayOfMonth;
        const monthEnd = end < lastDayOfMonth ? end : lastDayOfMonth;

        // Calculate how many working days were actually worked in this month excluding Fridays
        const daysWorkedInMonth = getWorkingDaysInRange(monthStart, monthEnd);
        daysWorkedExcludingFridays.push(daysWorkedInMonth);
        totalWorkingDays += daysWorkedInMonth;

        // Move to the first day of the next month
        current.setMonth(current.getMonth() + 1);
        current.setDate(1);
    }

    // Proportionally distribute the total annual target based on working days in each month
    for (let i = 0; i < daysWorkedExcludingFridays.length; i++) {
        const proportion = daysWorkedExcludingFridays[i] / totalWorkingDays;
        const monthlyTarget = totalAnnualTarget * proportion;
        monthlyTargets.push(monthlyTarget);
    }

    // Calculate the total target based on the working days
    const totalTarget = monthlyTargets.reduce((sum, target) => sum + target, 0);

    // Return the result as an object
    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget,
    };
}

// Example usage:
const result = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);
console.log(result);