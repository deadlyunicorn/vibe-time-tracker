import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

export const NoEntriesView = () => {

    return <Card>
        <CardContent className="pt-6 text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No time entries for today</p>
            <p className="text-sm text-muted-foreground">Start a timer or add an entry manually</p>
        </CardContent>
    </Card>
}