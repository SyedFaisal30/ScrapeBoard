from bs4 import BeautifulSoup
import httpx

async def scrape_website(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        soup = BeautifulSoup(response.text, "lxml")

    title = soup.title.string.strip() if soup.title else "No Title Found"

    description = None

    # Try meta name="description"
    meta = soup.find("meta", attrs={"name": "description"})
    if meta and meta.get("content"):
        description = meta["content"].strip()
    else:
        # Try meta property="og:description"
        for tag in soup.find_all("meta"):
            if tag.get("property", "").lower() == "og:description" and tag.get("content"):
                description = tag["content"].strip()
                break

    # Fallback: Use first paragraph <p>
    if not description:
        first_p = soup.find("p")
        description = first_p.text.strip() if first_p else "No description"

    return {
        "title": title,
        "description": description,
        "url": url
    }
