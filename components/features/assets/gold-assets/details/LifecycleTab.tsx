import { LifecycleTimeline } from "@/types/asset"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  data: LifecycleTimeline
}

export const LifecycleTab = ({ data }: Props) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      {Object.entries(data).map(([key, value]) => (
        <Card key={key} className="rounded-2xl">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 capitalize">
              {key.replace(/_/g, " ")}
            </p>
            <p className="text-xl font-semibold">
              {String(value)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
