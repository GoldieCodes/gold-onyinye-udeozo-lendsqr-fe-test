// The following functions fetch data from localStorage or an API and paginate the given data

/**
 * Checks localStorage for stored data and its timestamp.
 * Data is considered stale after 24 hours.
 *
 * @param storedDataKey - The key for the stored data in localStorage.
 * @param storedTimeKey - The key for the stored timestamp in localStorage.
 * @returns Parsed data from localStorage or null if data is stale or not found.
 */
export function checkStorageData<T>(
  storedDataKey: string,
  storedTimeKey: string,
  currentPage: number,
  rowsPerPage: number
): [T[], T[]] | null {
  // Data is considered stale after 24 hours (converted to milliseconds)
  const dataExpiryInterval = 24 * 60 * 60 * 1000

  // First check for data from localStorage
  const storedData = localStorage.getItem(storedDataKey)
  const storedTime = localStorage.getItem(storedTimeKey)

  if (storedData && storedTime) {
    const parsedData: T[] = JSON.parse(storedData)
    const parsedTime = parseInt(storedTime, 10)
    const timeRightNow = Date.now()

    // Check if the interval has been exceeded; if not, return the data
    if (timeRightNow - parsedTime < dataExpiryInterval) {
      // paginate the data

      const singleDataPage = parsedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
      return [parsedData, singleDataPage] // Return the complete fetched data and a paginated part of the fetched data to a state variable for display
    }
  }

  return null // Return null if no valid data is found
}

/**
 * Fetches data from an API and stores it in localStorage.
 *
 * @param api - The API endpoint to fetch data from.
 * @param dataStorageKey - The key for storing the data in localStorage.
 * @param timeStorageKey - The key for storing the timestamp in localStorage.
 * @returns Fetched data or null if the fetch failed.
 */
export async function fetchApiData<T>(
  api: string,
  dataStorageKey: string,
  timeStorageKey: string,
  currentPage: number,
  rowsPerPage: number
): Promise<[T[], T[]] | null> {
  const response = await fetch(api)

  if (response.ok) {
    const data: T[] = await response.json()
    const timeStamp = Date.now()
    // paginate the data
    const singleDataPage: T[] = data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    )

    // Store the fetched data and timestamp in localStorage
    localStorage.setItem(dataStorageKey, JSON.stringify(data))
    localStorage.setItem(timeStorageKey, timeStamp.toString())

    return [data, singleDataPage] // Return the complete fetched data and a paginated part of the fetched data to a state variable for display
  }
  return null
}
