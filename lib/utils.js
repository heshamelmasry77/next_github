import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export function getLastUpdated(time){
    dayjs.extend(relativeTime)
    return dayjs(time).fromNow()
}