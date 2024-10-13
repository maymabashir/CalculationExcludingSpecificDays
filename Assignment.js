function calculateTotalTarget(startDate, endDate, monthlyTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let daysExcludingFridays = [];
    let monthlyTargets = [];
    let totalTarget = 0;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (d.getDay() !== 5) { 
            const month = d.getMonth(); 
            if (!daysExcludingFridays[month]) {
                daysExcludingFridays[month] = 0;
            }
            daysExcludingFridays[month]++; 
        }
    }
    for (let i = 0; i < daysExcludingFridays.length; i++) {
        if (daysExcludingFridays[i]) {
            if (i === daysExcludingFridays.length - 1 && new Date(end).getDate() < 28) {
                const proportion = daysExcludingFridays[i] / new Date(start.getFullYear(), i + 1, 0).getDate();
                monthlyTargets[i] = +(monthlyTarget * proportion).toFixed(3);
            } else {
                monthlyTargets[i] = monthlyTarget; 
            }
            totalTarget += monthlyTargets[i]; 
        }
    }
    return {
        daysExcludingFridays,
        monthlyTargets,
        totalTarget: +totalTarget.toFixed(3) 
    };
  }
  const result = calculateTotalTarget('2024-03-01', '2024-05-31', 435);
  console.log(result);