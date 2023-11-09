import { Event } from "nostr-tools"

export const unixToDate = (unixTime: number): string => {
  const date = new Date(unixTime * 1000);

  const year = date.getFullYear().toString().slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${month}/${day}/${year}(${dayOfWeek})${hours}:${minutes}:${seconds}`;
};

export const uniqBy = <T>(arr: T[], key: keyof T): T[] => {
    return Object.values(
      arr.reduce(
        (map, item) => ({
          ...map,
          [`${item[key]}`]: item,
        }),
        {},
      ),
    )
  }
  
export const uniqValues = (value: string, index: number, self: string[]) => {
  return self.indexOf(value) === index
}

export const dateToUnix = (_date?: Date) => {
  const date = _date || new Date()

  return Math.floor(date.getTime() / 1000)
}

export interface Metadata {
  name?: string
  username?: string
  display_name?: string
  picture?: string
  banner?: string
  about?: string
  website?: string
  lud06?: string
  lud16?: string
  nip05?: string
}

export const getMetadata = (event: Event) => {
  const metadata: Metadata = JSON.parse(event.content)
  return metadata
}