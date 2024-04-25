export function getRandomDate(): Date {
  const currentDate = new Date()
  const endDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate()
  )
  const startDate = new Date(
    currentDate.getFullYear() - 2,
    currentDate.getMonth(),
    currentDate.getDate()
  ) // Two years ago

  // Generate a random date within the range
  const randomTimestamp =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime())
  const randomDate = new Date(randomTimestamp)

  // Add 5 hours and 30 minutes
  randomDate.setHours(
    randomDate.getHours() + 5,
    randomDate.getMinutes() + 30,
    0,
    0
  )

  return randomDate
}
