"use client"

import { useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

// Dummy brand data categorized
type BrandCategory = "casual" | "trendy" | "sports" | "footwear";

type Brand = {
  name: string;
  image: string;
  url: string;
};

const brandData: Record<BrandCategory, { name: string; image: string; url: string }[]> = {
  casual: [
    { name: "Bewakoof", image: "https://play-lh.googleusercontent.com/DAMBDVyBKiDEOsjD2sy4EpGHXvfUABNXpnbLLrc-STtYIgogcuqdRRyjaLJY5vxkAl8", url: "https://www.bewakoof.com/" },
    { name: "Turn Black", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDfEBBZYZs1uuhm1b2DRePMa41iGf8pKdQaw&s", url: "https://turnblack.in/" },
    { name: "Naushad Ali", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFUi4e-KSeyEIqQlx1pxNq6-tGB_0iXqbMA&s",url:"https://www.naushadali.in/" },
    { name: "Libas", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJYUThBH5mb5QO6DP3z3b5omqDEBZgXP_qtQ&s", url: "https://www.libas.in/" },
    { name: "The Souled Store", image: "https://vivianamalls.com/wp-content/uploads/2023/08/The-Souled-Store-Viviana-Mall-Thane-Mumbai.png", url: "https://www.thesouledstore.com/" },
    { name: "W for Woman", image: "https://wforwoman.com/cdn/shop/files/logo_e7a9ec14-4db5-4882-87d1-4b1ea23fe66c.png?height=68&v=1726139330", url: "https://www.wforwoman.com/" }
  ],
  trendy: [
    { name: "FabAlley", image: "https://media.licdn.com/dms/image/v2/C510BAQEKEDg15_sEfQ/company-logo_200_200/company-logo_200_200/0/1630574321975/faballey_logo?e=2147483647&v=beta&t=97inTWSv9aak7xz3XDvO47XmsiZcEZvHoNCRjRHCG2E", url: "https://www.faballey.com/" },
    { name: "Koovs", image: "https://static-asset.inc42.com/koovs.png", url: "https://www.ajio.com/b/koovs?srsltid=AfmBOoqxQMCZzziZEKLtv818M9-qI1B59ddLRHsqUfFp3VzfnQr8qktn" },
    { name: "StalkBuyLove", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAZlBMVEXru8MAAAAfBwzzwsoUAADvvsbVqrG6k5kOAACGaG1oUVUXAAAcAAcbAAWigYcoFBjgsrqYeH1VP0M1ISRvVVpdRkp/Y2hNOTw2JSjOo6s9Ki1iS056XmOrh43HnqQaBQqQcHb+ytNkIb6ZAAAB00lEQVRIie2U25KjIBBA6W4wGCDiJZdJMsb5/5/cBsToVNi3fdgqz4uFcmi7GxBiZ2fn36AUMWo1ntnM2QwjVLXD+VgfFM0vTjMHv6zmefj1y1QDgJRSg2vjF1XBwsOnyerAgwttPLoCopMG0cJNJREzElIYFlHXG1GdeBrcj3fQKK+URRPiaX42oiBS7xBark3Ff+xzRPPwVVU9w5rf6rMoAG0TA9E45hxRHinU+mxQP6ksSporLtZiSkMPBZFeFvVl1cSVSLVGOBV+leqQSPf1VqM4/HDa3lnnSsURopGhiN0hq0F092mantIZGEvtEMr3oW8GbiMtIjrNWHevqBxRqRq0DWr6EkVrGK73pMoi5+mnV4gKU94Atj933RWMhevfRFZFG81KbYpzNQjFPmZ1ZFOHkKs++lBxX8xxNgeJ8rERBTUWY10/ifTt06SL/i2miAVRjQCtIEUebarONkeEVXHSvTB3KJwOOZxq43I+8Tz2DATvkouD2ESwS2bDp87K2Ek+XovoGH7o29IOnhYx/fzLT+B+8VjDKW8AmdAAg8hbTmZ0Frn9XWNe99rPL/xx5tnOO44XexwX3kUKVyPfkO9CZ943oqIVn/bBzs7Of8cf8fUYJ4uC3hgAAAAASUVORK5CYII=", url: "https://www.myntra.com/stalkbuylove-dresses" },
    { name: "Shein India", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD2kqdomhRcBYdEZqcOSZrJK_-DErzJ9anhmn2_ctK7sYpyNEQ2j6NLNETzt9JYqHJYjU&usqp=CAU", url: "https://www.shein.in/" },
    { name: "Zara", image: "https://w7.pngwing.com/pngs/39/910/png-transparent-zara-fashion-clothes-clothing-brands-and-logos-icon-thumbnail.png", url: "https://www.zara.com/" },
    { name: "Mango", image: "https://e7.pngegg.com/pngimages/926/336/png-clipart-mango-kids-logo-retail-clothing-mango.png", url: "https://shop.mango.com/" }
  ],
  sports: [
    { name: "HRX", image: "https://mir-s3-cdn-cf.behance.net/projects/404/bd26f7203234937.Y3JvcCw4MDgsNjMyLDAsODg.jpg", url: "https://www.hrxbrand.com/" },
    { name: "Zymrat", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR3jQWa_EiyVnFcdgojigJXgYKFt0Vcr-pyg&s", url: "https://www.zymrat.com/" },
    { name: "Alcis Sports", image: "https://media.licdn.com/dms/image/v2/C4D0BAQHC233j15si2g/company-logo_200_200/company-logo_200_200/0/1645780434866/alcissports_logo?e=2147483647&v=beta&t=UIkVljnzWimJPywU6qab2_UQTfrowcDCS8iT0MoSyKE", url: "https://www.alcissports.com/" },
    { name: "Kica Active", image: "https://media.licdn.com/dms/image/v2/D560BAQHgBlI_KAnHkQ/company-logo_200_200/company-logo_200_200/0/1699259228374/kica_active_logo?e=2147483647&v=beta&t=vF5nkBNZUqJvEmWXC-egGzUZyTZbFrEMhFRDOmRnm1c", url: "https://kicaactive.com/" },
    { name: "Nike", image: "https://thumbs.dreamstime.com/b/nike-inc-american-multinational-corporation-engaged-design-development-manufacturing-worldwide-marketing-139136474.jpg", url: "https://www.nike.com/" },
    { name: "Adidas", image: "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg?w=385", url: "https://www.adidas.com/" }
  ],
  footwear: [
    { name: "Neeman's", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB-OAkD2v_AcRNRUBZYpd3fxh_lDd1aZGadQ&s", url: "https://www.neemans.com/" },
    { name: "Comet", image: "https://images.yourstory.com/cs/images/companies/1685442171769-1719902086663.jpg?fm=auto&ar=1%3A1&mode=fill&fill=solid&fill-color=fff&format=auto&w=384&q=75", url: "https://www.wearcomet.com/?utm_source=google&utm_medium=google_ads&utm_campaign=google_ads_brand_search_header_28-07&tw_source=google&tw_adid=667115964436&tw_campaign=20365005964&gad_source=1&gclid=CjwKCAiAtsa9BhAKEiwAUZAszbBXn5-lo9AN9SWUan0bow1Ln-2cIRCfKCci_YgPbAFotrIoZkNd-RoCUQQQAvD_BwE" },
    { name: "Woodland", image: "https://static.vecteezy.com/system/resources/previews/020/975/575/non_2x/woodland-logo-woodland-icon-transparent-free-png.png", url: "https://www.woodlandworldwide.com/" },
    { name: "Bata India", image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc7a5fbfb-bb7f-40f3-a179-21fead60b632_1000x1000.jpeg", url: "https://www.bata.in/" },
    { name: "New Balance Shoes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLYsNQlrQAorov0JZNrSLZdcat3_HIoVymQ&s", url: "https://www.newbalance.com/" },
    { name: "Puma", image: "https://static.vecteezy.com/system/resources/previews/022/076/746/non_2x/puma-logo-and-art-free-vector.jpg", url: "https://www.puma.com/" }
  ]
}

export default function MasonryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<BrandCategory>("casual")
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Category Selector */}
      <div className="flex justify-center w-full">
        <Select onValueChange={(value: BrandCategory) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casual">Casual Wear</SelectItem>
            <SelectItem value="trendy">Trendy Fashion</SelectItem>
            <SelectItem value="sports">Sports Wear</SelectItem>
            <SelectItem value="footwear">Footwear</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {brandData[selectedCategory as keyof typeof brandData].map((brand: Brand, i: number) => (
          <Card
            key={i}
            className={`overflow-hidden cursor-pointer ${
              i % 3 === 0 ? "row-span-2" : ""
            }`}
            onClick={() => window.open(brand.url, "_blank")}
          >
            <CardContent className="p-6 h-full flex flex-col items-center justify-center gap-4">
              <img src={brand.image} alt={brand.name} className="w-16 h-16 rounded-full border" />
              <h3 className="text-lg font-medium">{brand.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
