import { InfluencerProfile } from '@/components/influencer-profile'

export default function InfluencerPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <InfluencerProfile id={params.id} />
    </div>
  )
}

