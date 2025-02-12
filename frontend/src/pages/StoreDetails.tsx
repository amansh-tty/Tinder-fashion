import { StoreDetails } from '@/components/store-details'

export default function StorePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <StoreDetails id={params.id} />
    </div>
  )
}

