/* eslint-disable @typescript-eslint/no-namespace */
export namespace Utils {
    export const calculateDuration = (start: string, end: string): number => {
        const startDate = new Date(`2000-01-01T${start}`)
        const endDate = new Date(`2000-01-01T${end}`)
        return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60))
    }


    export const formatDuration = (minutes: number): string => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${hours}h ${mins}m`
    }
}