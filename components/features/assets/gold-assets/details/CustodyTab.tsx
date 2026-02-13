import { CustodyChainItem } from "@/types/asset"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  data: CustodyChainItem[]
}

export const CustodyTab = ({ data }: Props) => {
  return (
    <div className="space-y-4 mt-6">
      {data.map((custody, index) => (
        <Card key={index} className="rounded-2xl">
          <CardContent className="p-4 space-y-2">
            <p><strong>Party Type:</strong> {custody.custody_party_type}</p>
            <p><strong>Party ID:</strong> {custody.custody_party_id}</p>
            <p><strong>From:</strong> {custody.from_date}</p>
            <p><strong>To:</strong> {custody.to_date ?? "Current"}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
