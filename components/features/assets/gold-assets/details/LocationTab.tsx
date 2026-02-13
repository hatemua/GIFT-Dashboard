import { LocationHistoryItem } from "@/types/asset"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  data: LocationHistoryItem[]
}

export const LocationTab = ({ data }: Props) => {
  return (
    <div className="space-y-4 mt-6">
      {data.map((loc, index) => (
        <Card key={index} className="rounded-2xl">
          <CardContent className="p-4 space-y-2">
            <p><strong>Vault Site:</strong> {loc.vault_site_id}</p>
            <p><strong>Vault ID:</strong> {loc.vault_id}</p>
            <p><strong>From:</strong> {loc.from_date}</p>
            <p><strong>To:</strong> {loc.to_date ?? "Current"}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
