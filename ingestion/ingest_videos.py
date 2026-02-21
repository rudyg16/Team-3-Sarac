# ingestion plus filtering pipline 
# for each. ytube channel it gets :
# uploads playlist ,pulls recent videos ( last 6 months )
# limit to 120 videos max
# combines all result and prints the total

import os
import json
from datetime import datetime, timedelta
from googleapiclient.discovery import build
from dotenv import load_dotenv

print("Script started...")

load_dotenv()

API_KEY = os.getenv("YOUTUBE_API_KEY")
if not API_KEY:
    raise ValueError("API key not found. Check your .env file.")

youtube = build("youtube", "v3", developerKey=API_KEY)

#dataset and quality control 
VIEW_THRESHOLD = 5000
DAYS_BACK = 180
MAX_PER_CHANNEL = 120


def get_uploads_playlist(channel_id):
    response = youtube.channels().list( part="contentDetails", id=channel_id).execute() 
    return response["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]


def get_recent_videos(playlist_id):
    cutoff_date = datetime.utcnow() - timedelta(days=DAYS_BACK)
    video_ids = []
    next_page_token = None

    while True:
        #returns 50 videos per request, ytube gives nextPageToken if there
        #are more than 50 videos 
        response = youtube.playlistItems().list(
            part="snippet",
            playlistId=playlist_id,
            maxResults=50,
            pageToken=next_page_token
        ).execute()

        for item in response["items"]:
            published_at = datetime.strptime(
                item["snippet"]["publishedAt"],
                "%Y-%m-%dT%H:%M:%SZ"
            )

            #stop if older than 6 months
            if published_at < cutoff_date:
                return video_ids
            #cap, prevents 2k+ from one channel 
            if len(video_ids) >= MAX_PER_CHANNEL:
                return video_ids

            video_ids.append(item["snippet"]["resourceId"]["videoId"])
        next_page_token = response.get("nextPageToken")
        if not next_page_token:
            break
    return video_ids


def filter_by_views(video_ids):
    filtered = []
    for i in range(0, len(video_ids), 50):
        batch = video_ids[i:i+50]
        response = youtube.videos().list( part="statistics", id=",".join(batch) ).execute()
        for item in response["items"]:
            views = int(item["statistics"].get("viewCount", 0))
            if views > VIEW_THRESHOLD:
                filtered.append(item["id"])
    return filtered

if __name__ == "__main__":
   
    channel_ids = [
        "UCET00YnetHT7tOpu12v8jxg",
        "UCqZQlzSHbVJrwrn5XvzrzcA",
        "UC6c1z7bA__85CIWZ_jpCK-Q",
        "UC0YatYmg5JRYzXJPxIdRd8g",
        "UC6UL29enLNe4mqwTfAyeNuw"
    ]

    all_videos = []

    for channel_id in channel_ids:
        print("\n=================================")
        print(f"Processing channel: {channel_id}")

        playlist_id = get_uploads_playlist(channel_id)

        recent_videos = get_recent_videos(playlist_id)
        print(f"Recent (<= 6 months): {len(recent_videos)}")

        filtered_videos = filter_by_views(recent_videos)
        print(f"Passed view filter (>5000): {len(filtered_videos)}")

        all_videos.extend(filtered_videos)

    print("\n=================================")
    print(f"TOTAL VIDEOS COLLECTED: {len(all_videos)}")
   
 # Save results to JSON file
    with open("filtered_videos.json", "w") as f:
        json.dump(all_videos, f, indent=4)