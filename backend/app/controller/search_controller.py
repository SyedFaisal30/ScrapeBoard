from bs4 import BeautifulSoup
import httpx
import re

async def scrape_topic_news(topic: str):
    url = f"https://timesofindia.indiatimes.com/topic/{topic}/news"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        soup = BeautifulSoup(response.text, "lxml")

    articles = []
    seen = set()

    for div in soup.select("div.uwU81"):
        a_tag = div.find("a", href=True)
        if not a_tag:
            continue

        href = a_tag["href"].strip()
        if not href or href in seen or "articleshow" not in href:
            continue
        seen.add(href)

        # Get headline from inner div
        headline_tag = a_tag.select_one("div.VXBf7")
        headline = headline_tag.get_text(strip=True) if headline_tag else "No headline"

        # Extract MSID from the URL
        msid_match = re.search(r"/articleshow/(\d+)\.cms", href)
        if not msid_match:
            continue
        msid = msid_match.group(1)

        full_url = (
            href if href.startswith("http")
            else "https://timesofindia.indiatimes.com" + href
        )

        image_url = f"https://static.toiimg.com/thumb/imgsize-950438,msid-{msid},width-600,resizemode-4/{msid}.jpg"

        articles.append({
            "headline": headline,
            "url": full_url,
            "image": image_url
        })

    return {
        "source": f"Times of India - Search: {topic}",
        "url": url,
        "articles": articles
    }
