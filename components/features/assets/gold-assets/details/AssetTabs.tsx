import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetTrackingResponse } from "@/types/asset"
import { AssetSummaryTab } from "./AssetSummaryTab"
import { LifecycleTab } from "./LifecycleTab"
import { TrackingEventsTab } from "./TrackingEventsTab"
import { OwnershipTab } from "./OwnershipTab"
import { CustodyTab } from "./CustodyTab"
import { LocationTab } from "./LocationTab"


interface Props {
  data: AssetTrackingResponse
}

export const AssetTabs = ({ data }: Props) => {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid grid-cols-7 w-full gap-1">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
        <TabsTrigger value="ownership">Ownership</TabsTrigger>
        <TabsTrigger value="custody">Custody</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
      </TabsList>

      <TabsContent value="summary">
        <AssetSummaryTab data={data.asset_summary} />
      </TabsContent>

      <TabsContent value="events">
        <TrackingEventsTab events={data.tracking_events} lifecycle={data.lifecycle_timeline}/>
      </TabsContent>

      <TabsContent value="ownership">
        <OwnershipTab data={data.ownership_chain} />
      </TabsContent>

      <TabsContent value="custody">
        <CustodyTab data={data.custody_chain} />
      </TabsContent>

      <TabsContent value="location">
        <LocationTab data={data.location_history} />
      </TabsContent>
    </Tabs>
  )
}
