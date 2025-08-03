# from bs4 import BeautifulSoup
# import httpx

# async def scrape_website():
#     url = "https://timesofindia.indiatimes.com/news"

#     async with httpx.AsyncClient() as client:
#         response = await client.get(url)
#         soup = BeautifulSoup(response.text, "lxml")

#     articles = []

#     # Only pick links with headline + image inside article cards
#     seen = set()
#     for a in soup.select("a[href*='/articleshow/']"):
#         href = a.get("href", "")
#         headline = a.get_text(strip=True)

#         # Skip if already added (avoid duplicates)
#         if not href or href in seen or not headline:
#             continue
#         seen.add(href)

#         # Must have an image
#         img_tag = a.find("img")
#         if not img_tag or not img_tag.has_attr("src"):
#             continue

#         full_url = href
#         image_url = img_tag["src"]

#         articles.append({
#             "headline": headline,
#             "url": full_url,
#             "image": image_url
#         })

#         # Limit to 10 latest news
#         if len(articles) == 10:
#             break

#     return {
#         "source": "Times of India",
#         "url": url,
#         "articles": articles
#     }
     
from bs4 import BeautifulSoup
import httpx
import re

async def scrape_website():
    url = "https://timesofindia.indiatimes.com/news"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        soup = BeautifulSoup(response.text, "lxml")

    articles = []

    seen = set()
    for a in soup.select("a[href*='/articleshow/']"):
        href = a.get("href", "").strip()
        headline = a.get_text(strip=True)   

        if not href or href in seen or not headline:
            continue
        seen.add(href)

        msid_match = re.search(r"/articleshow/(\d+)\.cms", href)
        if not msid_match:
            continue
        msid = msid_match.group(1)

        # Construct image URL using MSID
        image_url = f"https://static.toiimg.com/thumb/imgsize-950438,msid-{msid},width-600,resizemode-4/{msid}.jpg"

        full_url = (
            href if href.startswith("http")
            else "https://timesofindia.indiatimes.com" + href
        )

        articles.append({
            "headline": headline,
            "url": full_url,
            "image": image_url
        })


    return {
        "source": "Times of India",
        "url": url,
        "articles": articles
    }
